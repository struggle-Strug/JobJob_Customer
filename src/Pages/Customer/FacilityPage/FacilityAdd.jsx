"use client";

import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Input,
  message,
  Modal,
  Radio,
  Select,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Helmet } from "react-helmet";
import axios from "axios";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  Facilities,
  Features,
  JobType,
  Prefectures,
} from "../../../utils/constants/categories";
import { Municipalities } from "../../../utils/constants/categories/municipalities";
import { getBase64 } from "../../../utils/getBase64";
import ImageEditModal from "./ImageEditModal";
import PhotoSelectModal from "./PhotoSelectModal";

const FacilityAdd = () => {
  const { customer } = useAuth();
  const navigate = useNavigate();

  // 各種フォーム用の状態
  const [facilityName, setFacilityName] = useState("");
  const [facilityPostalCode, setFacilityPostalCode] = useState("");
  const [facilityPrefecture, setFacilityPrefecture] = useState("");
  const [facilityCity, setFacilityCity] = useState("");
  const [facilityVillage, setFacilityVillage] = useState("");
  const [facilityBuilding, setFacilityBuilding] = useState("");
  const [facilityPhoto, setFacilityPhoto] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [photoSelectModalVisible, setPhotoSelectModalVisible] = useState(false);
  const [facilityIntroduction, setFacilityIntroduction] = useState("");
  const [facilityJobType, setFacilityJobType] = useState("");
  const [facilityJobTypeDetail, setFacilityJobTypeDetail] = useState("");
  const [facilityAccess, setFacilityAccess] = useState("");
  const [facilityAccessText, setFacilityAccessText] = useState("");
  const [facilityGenre, setFacilityGenre] = useState("");
  const [facilityServiceType, setFacilityServiceType] = useState([]);
  const [facilityEstablishmentDateYear, setFacilityEstablishmentDateYear] =
    useState("");
  const [facilityEstablishmentDateMonth, setFacilityEstablishmentDateMonth] =
    useState("");
  const [facilityServiceTime, setFacilityServiceTime] = useState("");
  const [facilityRestDay, setFacilityRestDay] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // ローディング状態
  const [loading, setLoading] = useState(false);

  const allPrefectureKeys = [
    ...Object.keys(Prefectures.KANTO),
    ...Object.keys(Prefectures.KANSAI),
    ...Object.keys(Prefectures.TOKAI),
    ...Object.keys(Prefectures.HOKKAIDO_TOHOKU),
    ...Object.keys(Prefectures.KOSHINETSU_HOKURIKU),
    ...Object.keys(Prefectures.CHUGOKU_SHIKOKU),
    ...Object.keys(Prefectures.KYUSHU_OKINAWA),
  ];

  const allPrefectureOptions = allPrefectureKeys.map((item) => ({
    label: item,
    value: item,
  }));

  const cityOptions = (prefecture) => {
    return [
      {
        label: "選択する",
        value: "",
      },
      ...Municipalities[prefecture].map((type) => ({
        value: type,
        label: type,
      })),
    ];
  };

  const jobTypesOptions = [
    {
      label: "選択する",
      value: "",
    },
    ...Object.keys(JobType).map((type) => ({
      value: type,
      label: type,
    })),
  ];

  const jobTypeDetailOptions = (jobType) => {
    return [
      {
        label: "選択する",
        value: "",
      },
      ...Object.keys(JobType[jobType]).map((type) => ({
        value: type,
        label: type,
      })),
    ];
  };

  const accessOptions = [
    ...Object.keys(Features.ACCESS).map((station) => ({
      value: station,
      label: station,
    })),
  ];

  const facilityGenreOptions = [
    ...Object.keys(Facilities).map((genre) => ({
      value: genre,
      label: genre,
    })),
  ];

  const serviceTypeOptions = [
    ...Object.keys(Features.SERVICE_TYPES).map((type) => ({
      value: type,
      label: type,
    })),
  ];

  // This function handles the file selection directly from the upload button
  const handleFileSelect = (e) => {
    const file = e.file.originFileObj;
    if (!file) return;

    // Prevent the default upload behavior
    e.stopPropagation();

    // Process the file for editing
    getBase64(file).then((base64) => {
      setCurrentImage(base64);
      setEditModalVisible(true);
    });
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleEditSave = (croppedImage) => {
    const { file, preview } = croppedImage;

    // Create a new file entry with the cropped image
    const newFile = {
      uid: `${Date.now()}`,
      name: file.name || "cropped-image.jpg",
      status: "done",
      originFileObj: file,
      preview: preview,
      url: preview, // Add url for consistency with PhotoSelectModal
    };

    // Check if adding this would exceed the limit
    if (facilityPhoto.length >= 10) {
      message.error("最大10枚までしか選択できません");
      return;
    }

    // Add only the edited image to the file list
    setFacilityPhoto((prev) => [...prev, newFile]);
    setEditModalVisible(false);
    setCurrentImage(null);
  };

  const handleUpload = async () => {
    if (facilityPhoto.length === 0) {
      return { fileUrls: [], files: [] };
    }

    // Extract new files that need to be uploaded
    const newFiles = facilityPhoto.filter((file) => file.originFileObj);
    const existingFiles = facilityPhoto.filter((file) => !file.originFileObj);

    let uploadedFileUrls = [];
    let uploadedFiles = [];

    // Process files in smaller batches to prevent server overload
    if (newFiles.length > 0) {
      try {
        // Split files into batches of 3 to prevent server overload
        const batchSize = 3;
        const batches = [];

        for (let i = 0; i < newFiles.length; i += batchSize) {
          batches.push(newFiles.slice(i, i + batchSize));
        }

        // Upload each batch sequentially
        for (const batch of batches) {
          const formData = new FormData();
          batch.forEach((file) => {
            formData.append("files", file.originFileObj);
          });

          const response = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/api/v1/file/multi`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              timeout: 30000, // Increase timeout to 30 seconds
            }
          );

          // Collect results from each batch
          uploadedFileUrls = [
            ...uploadedFileUrls,
            ...response.data.files.map((item) => item.fileUrl),
          ];
          uploadedFiles = [...uploadedFiles, ...response.data.files];
        }

        message.success("ファイルのアップロードに完了しました");
      } catch (error) {
        console.error("Upload error:", error);
        message.error(
          `ファイルのアップロードに失敗しました: ${
            error.message || "Unknown error"
          }`
        );
        return { fileUrls: [], files: [] };
      }
    }

    // 既存ファイルの URL を抽出
    const existingFileUrls = existingFiles.map((file) => file.url);

    // 両方を統合して返す
    return {
      fileUrls: [...uploadedFileUrls, ...existingFileUrls],
      files: uploadedFiles,
    };
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Validate required fields first
      if (facilityName === "")
        return message.error("施設名を入力してください。");
      if (facilityPostalCode === "")
        return message.error("郵便番号を入力してください。");
      if (facilityPrefecture === "")
        return message.error("都道府県を選択してください。");
      if (facilityCity === "")
        return message.error("市区町村を入力してください。");
      if (facilityVillage === "")
        return message.error("町名・番地を入力してください。");
      if (facilityGenre === "")
        return message.error("施設ジャンルを選択してください。");

      // Handle photo upload first
      let photoUrls = { fileUrls: [], files: [] };
      if (facilityPhoto.length > 0) {
        message.loading("写真をアップロード中...", 0);
        photoUrls = await handleUpload();
        message.destroy();
      }

      const facilityData = {
        customer_id: customer.customer_id,
        name: facilityName,
        postal_code: facilityPostalCode,
        prefecture: facilityPrefecture,
        city: facilityCity,
        village: facilityVillage,
        building: facilityBuilding,
        photo: photoUrls.fileUrls,
        introduction: facilityIntroduction,
        access: facilityAccess,
        access_text: facilityAccessText,
        facility_genre: facilityGenre,
        establishment_date: `${facilityEstablishmentDateYear}-${facilityEstablishmentDateMonth}`,
        service_time: facilityServiceTime,
        rest_day: facilityRestDay,
      };

      // Only call the photo API if we have new files
      if (photoUrls.files && photoUrls.files.length > 0) {
        await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/v1/photo/image`,
          photoUrls.files
        );
      }

      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/facility`,
        facilityData
      );
      if (response.data.error) message.error(response.data.error);
      message.success(response.data.message);
      navigate(`/customers/facility`);
    } catch (error) {
      console.error("Facility save error:", error);
      message.error(
        `施設の登録に失敗しました: ${error.message || "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Remove a file from the list
  const handleRemove = (file) => {
    const newFileList = facilityPhoto.filter((item) => item.uid !== file.uid);
    setFacilityPhoto(newFileList);
  };

  useEffect(() => {
    document.title = "施設登録・編集 | JobJob (ジョブジョブ)";
  }, []);

  const createProcessedImage = async (base64) => {
    return new Promise((resolve) => {
      // Check if the base64 string is valid
      if (!base64 || !base64.startsWith("data:image")) {
        message.error("Invalid image format");
        resolve(null);
        return;
      }

      try {
        // Compress the image if it's too large
        const img = new Image();
        img.src = base64;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set maximum dimensions
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;

          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          // Set canvas dimensions and draw the resized image
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Get the compressed image as base64
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.8);

          // Convert to file
          const file = base64ToFile(compressedBase64, "image.jpeg");
          resolve({ file: file, preview: compressedBase64 });
        };

        img.onerror = () => {
          message.error("Image processing failed");
          resolve(null);
        };
      } catch (error) {
        console.error("Image processing error:", error);
        message.error("Image processing failed");
        resolve(null);
      }
    });
  };

  const base64ToFile = (base64String, filename) => {
    let arr = base64String.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <>
      <Helmet>
        <title>施設登録・編集 | JobJob (ジョブジョブ)</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {loading ? <Loading /> : <></>}
      <div className="min-h-screen bg-white p-6 rounded-lg">
        <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434]">
          施設を新規登録
        </p>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            施設名
            <span className="text-[0.7rem] text-[#FF2A3B] pl-1">(必須)</span>
          </p>
          <Input
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
            className="w-1/4"
          />
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            郵便番号
            <span className="text-[0.7rem] text-[#FF2A3B] pl-1">(必須)</span>
          </p>
          <Input
            value={facilityPostalCode}
            onChange={(e) => setFacilityPostalCode(e.target.value)}
            className="w-1/4"
          />
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            都道府県
            <span className="text-[0.7rem] text-[#FF2A3B] pl-1">(必須)</span>
          </p>
          <Select
            options={allPrefectureOptions}
            onChange={(e) => setFacilityPrefecture(e)}
            className="w-1/4"
          />
        </div>
        {facilityPrefecture !== "" && (
          <div className="flex items-center mt-4">
            <p className="lg:text-sm text-xs w-1/5">
              市区町村
              <span className="text-[0.7rem] text-[#FF2A3B] pl-1">(必須)</span>
            </p>
            <Select
              options={cityOptions(facilityPrefecture)}
              onChange={(e) => setFacilityCity(e)}
              className="w-1/4"
            />
          </div>
        )}
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            町名・番地
            <span className="text-[0.7rem] text-[#FF2A3B] pl-1">(必須)</span>
          </p>
          <Input
            value={facilityVillage}
            onChange={(e) => setFacilityVillage(e.target.value)}
            className="w-1/4"
          />
        </div>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">建物名</p>
          <Input
            value={facilityBuilding}
            onChange={(e) => setFacilityBuilding(e.target.value)}
            className="w-1/4"
          />
        </div>
        <div className="flex items-start mt-4">
          <div className="flex items-center justify-start gap-1 w-1/5">
            <span className="lg:text-sm text-xs text-[#343434]">施設写真</span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <Upload
              maxCount={10}
              name="avatar"
              listType="picture-card"
              fileList={facilityPhoto}
              onPreview={handlePreview}
              onRemove={handleRemove}
              customRequest={({ onSuccess }) => {
                // Do nothing, just call onSuccess to mark it as done
                setTimeout(() => {
                  onSuccess("ok", null);
                }, 0);
              }}
              showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
              openFileDialogOnClick={false} // Prevent opening file dialog on click
            >
              <div
                className="flex items-center justify-center aspect-square w-32 cursor-pointer flex-col rounded-lg border border-dashed bg-light-gray p-3"
                onClick={() => {
                  // Check if we've already reached the maximum number of photos
                  if (facilityPhoto.length >= 10) {
                    message.error("最大10枚までしか選択できません");
                    return;
                  }

                  // Create a file input element
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // Check file size (limit to 5MB)
                      if (file.size > 5 * 1024 * 1024) {
                        message.error("ファイルサイズは5MB以下にしてください");
                        return;
                      }

                      getBase64(file)
                        .then((base64) => {
                          // Instead of showing the modal, directly process the image
                          createProcessedImage(base64).then(
                            (processedImage) => {
                              if (processedImage) {
                                handleEditSave(processedImage);
                              }
                            }
                          );
                        })
                        .catch((error) => {
                          console.error("File processing error:", error);
                          message.error("ファイル処理中にエラーが発生しました");
                        });
                    }
                  };
                  input.click();
                }}
              >
                <PlusOutlined />
                <div className="mt-4 text-center">Upload</div>
              </div>
            </Upload>
          </div>
        </div>
        <div className="flex items-start mt-1">
          <div className="flex items-center justify-start gap-1 w-1/5" />
          <div className="flex items-center justify-start gap-2">
            <Button onClick={() => setPhotoSelectModalVisible(true)}>
              写真管理から選択
            </Button>
          </div>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">施設紹介</p>
          <TextArea
            value={facilityIntroduction}
            onChange={(e) => setFacilityIntroduction(e.target.value)}
            className="w-3/4 h-40"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">アクセス</p>
          <Checkbox.Group
            options={accessOptions}
            value={facilityAccess}
            onChange={(value) => setFacilityAccess(value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4">
          <p className="lg:text-sm text-xs w-1/5">アクセス（補足）</p>
          <Input
            value={facilityAccessText}
            onChange={(e) => setFacilityAccessText(e.target.value)}
            className="w-1/2"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">
            施設ジャンル
            <span className="text-[0.7rem] text-[#FF2A3B] pl-1">(必須)</span>
          </p>
          <Radio.Group
            options={facilityGenreOptions}
            value={facilityGenre}
            onChange={(value) => setFacilityGenre(value.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">設立年月</p>
          <div className="flex justify-start items-end w-4/5">
            <Input
              value={facilityEstablishmentDateYear}
              onChange={(e) => setFacilityEstablishmentDateYear(e.target.value)}
              className="w-1/4"
            />
            <span className="mx-2">年</span>
            <Input
              value={facilityEstablishmentDateMonth}
              onChange={(e) =>
                setFacilityEstablishmentDateMonth(e.target.value)
              }
              className="w-1/4"
            />
            <span className="mx-2">月</span>
          </div>
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">営業時間</p>
          <Input
            value={facilityServiceTime}
            onChange={(e) => setFacilityServiceTime(e.target.value)}
            className="w-1/2"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">休日</p>
          <Input
            value={facilityRestDay}
            onChange={(e) => setFacilityRestDay(e.target.value)}
            className="w-1/2"
          />
        </div>
        <div className="flex items-center justify-center w-full mt-8 gap-4 border-t-[1px] border-[#e7e7e7] pt-4">
          <button
            className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
            onClick={handleSave}
          >
            施設を申請する
          </button>
        </div>
        <PhotoSelectModal
          visible={photoSelectModalVisible}
          onCancel={() => setPhotoSelectModalVisible(false)}
          onSelect={(selected) => {
            const formattedPhotos = selected.map((photo, index) => ({
              uid: `existing-${index}-${photo.photoUrl}`,
              name: `Photo ${index + 1}`,
              url: photo.photoUrl,
              status: "done",
            }));
            const totalPhotos = facilityPhoto.length + formattedPhotos.length;
            if (totalPhotos > 10) {
              message.error("最大10枚までしか選択できません");
              return;
            }
            setFacilityPhoto((prev) => [...prev, ...formattedPhotos]);
            setPhotoSelectModalVisible(false);
          }}
        />

        {/* モーダルで拡大表示 */}
        <Modal
          visible={previewOpen}
          footer={null}
          onCancel={() => setPreviewOpen(false)}
          closeIcon={
            <CloseOutlined
              style={{
                backgroundColor: "#fff",
                padding: "5px",
                borderRadius: "5px",
              }}
            />
          }
        >
          <img
            src={previewImage || "/placeholder.svg"}
            alt="enlarged"
            style={{ width: "100%" }}
          />
        </Modal>
        {/* Image Edit Modal - still needed for direct processing */}
        <ImageEditModal
          visible={editModalVisible}
          image={currentImage}
          onCancel={() => {
            setEditModalVisible(false);
            setCurrentImage(null);
          }}
          onSave={handleEditSave}
        />
      </div>
    </>
  );
};

export default FacilityAdd;
