import { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, message, Tooltip, Upload } from "antd";
import { toast } from "react-hot-toast";

import axios from "axios";
import DescriptionChangeModal from "./DescriptionChangeModal";
import { Helmet } from "react-helmet";
const { Dragger } = Upload;

const PhotoManagement = () => {
  const [companyName, setCompanyName] = useState("");
  const [fileList, setFileList] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState("");

  const beforeUpload = () => {
    return false;
  };

  const handleChange = (info) => {
    // Provide feedback on upload status
    let updatedFileList = info.fileList.filter((file) => {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("ファイルサイズは5MB以下にしてください");
        return false;
      }

      if (file.status === "done") {
        toast.success(`${file.name} file uploaded successfully`);
      } else if (file.status === "error") {
        toast.error(`${file.name} file upload failed.`);
        return false;
      }
      return true;
    });
    setFileList(updatedFileList);
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      return;
    }

    const formData = new FormData();

    // Append multiple files
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj); // Ensure correct file object
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/file/multi`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.isAuthError) return;
      toast.success("ファイルアップロード完了!");
      return response.data.files; // Assuming API returns an array of URLs
    } catch (error) {
      toast.error("ファイルアップロードに失敗しました");
    }
  };

  const handleDeleteImage = async (phototUrl) => {
    try {
      const photoName = phototUrl.split("/").pop();
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/file/${photoName}`
      );
      if (response.error) return false;
      return true;
    } catch (err) {
      console.log("Error deleteing Image:", err.message);
      return false;
    }
  };

  const handleDelete = async (phototUrl) => {
    try {
      const photoName = phototUrl.split("/").pop();
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/photo/${encodeURIComponent(
          phototUrl
        )}`
      );
      if (response.error) return toast.error("画像の削除に失敗しました。");
      if (response.data.isAuthError) return;
      toast.success("ファイル削除完了!");
      setPhotos(response.data.photos?.images);

      const deleteResult = await handleDeleteImage(phototUrl);
      if (!deleteResult) return;
    } catch (error) {
      console.log("Error deleting image:", error.message);
    }
  };

  const handleSave = async () => {
    try {
      const files = await handleUpload();
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/v1/photo/`, {
        companyName: companyName,
      });
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/photo/image`,
        files || []
      );
      getPhotosByCustomerId();
      setFileList([]);
    } catch (error) {
      console.error(error);
      toast.error("エラーが発生しました");
    }
  };

  const getPhotosByCustomerId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/photo/`
      );
      setPhotos(response.data.photos?.images);
      setCompanyName(response.data.photos?.companyName);
    } catch (error) {
      if (error.status != 401) {
        console.error(error);
        toast.error("エラーが発生しました");
      }
    }
  };

  const handleOpenDescriptionModal = (description, id) => {
    setDescriptionModalOpen(true);
    setDescription(description);
    setSelectedPhoto(id);
  };

  const updateDescription = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/photo/${selectedPhoto}`,
        { description: description }
      );
      if (response.data.error) return toast.error(response.data.message);
      toast.success("説明文更新成功");
      setDescription("");
      setDescriptionModalOpen(false);
      getPhotosByCustomerId();
    } catch (error) {
      console.error(error);
      toast.error("エラーが発生しました");
    }
  };

  useEffect(() => {
    getPhotosByCustomerId();
    //window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <title>写真管理 | JobJob (ジョブジョブ)</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="w-full min-h-screen">
        <div className="flex flex-col w-full bg-white rounded-lg shadow-xl min-h-screen">
          <p className="text-left lg:text-xl md:text-base text-sm font-bold text-[#343434] p-4">
            写真管理
          </p>
          <p className="text-left lg:text-xl md:text-base text-sm font-bold text-[#343434] p-4">
            新規アップロード
          </p>
          <div className="flex flex-col px-8">
            <p className="text-left lg:text-sm text-xs text-[#343434]">
              JPG・PNG・GIF形式の画像ファイルをアップロードしてください。
            </p>
            <p className="text-left lg:text-sm text-xs text-[#343434]">
              1ファイルあたり5MBのファイルが登録可能です。
            </p>
            <div className="w-2/3 mt-4 mb-8">
              <Dragger
                fileList={fileList}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  画像をドラッグアンドドロップ　または　ここをクリックして画像選択
                </p>
              </Dragger>
              <Button className="primary mt-4" onClick={handleSave}>
                アップロード
              </Button>
            </div>
          </div>
          <p className="text-left text-lg font-bold text-[#343434] p-4">
            アップロード済みの写真
          </p>
          <div className="flex flex-wrap">
            {photos?.map((photo, index) => (
              <div className="flex flex-col w-1/5 p-4">
                <img
                  key={index}
                  src={photo.photoUrl}
                  alt={`Uploaded Photo ${index}`}
                  className={`aspect-[4/3] object-${
                    660 / 370 < photo.photoWidth / photo.photoHeight
                      ? "cover"
                      : "contain"
                  } p-2`}
                />
                <Tooltip
                  placement="bottom"
                  title={photo.description}
                  className="duration-300"
                >
                  <p className="text-xs text-[#343434] pl-2 break-words line-clamp-2">
                    {photo.description}
                  </p>
                </Tooltip>
                <div className="flex justify-between w-full">
                  <button
                    className="text-left text-xs text-[#FF2A3B] pl-2 mt-2"
                    onClick={() =>
                      handleOpenDescriptionModal(photo.description, photo._id)
                    }
                  >
                    説明文を更新
                  </button>
                  <button
                    className="text-left text-xs text-[#FF2A3B] pl-2 mt-2 hover:underline"
                    onClick={() => handleDelete(photo.photoUrl)}
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DescriptionChangeModal
        open={descriptionModalOpen}
        onCancel={() => setDescriptionModalOpen(false)}
        description={description}
        setDescription={setDescription}
        updateDescription={updateDescription}
      />
    </>
  );
};

export default PhotoManagement;
