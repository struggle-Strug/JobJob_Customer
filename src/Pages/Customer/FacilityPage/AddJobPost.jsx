import { Helmet } from "react-helmet";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";

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
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  EmploymentType,
  Features,
  JobType,
  Paysystems,
  Qualifications,
} from "../../../utils/constants/categories";
import { getBase64 } from "../../../utils/getBase64";
import ImageEditModal from "./ImageEditModal";
import PhotoSelectModal from "./PhotoSelectModal";

// ===== 数値入力用ヘルパ（IME対策） =====
const onlyDigits = (v) => (v || "").replace(/[^\d]/g, "");
const withComma = (v) => (v ? Number(v).toLocaleString() : "");

const AddJobPost = () => {
  const { customerUser } = useAuth();
  const [sheetData, setSheetData] = useState([]);
  const [facility, setFacility] = useState(null);
  const [jobPostType, setJobPostType] = useState("");
  const [jobPostTypeDetail, setJobPostTypeDetail] = useState("");
  const [jobPostPicture, setJobPostPicture] = useState([]);
  const [jobPostSubTitle, setJobPostSubTitle] = useState("");
  const [jobPostSubDescription, setJobPostSubDescription] = useState("");
  const [jobPostWorkItem, setJobPostWorkItem] = useState([]);
  const [jobPostWorkContent, setJobPostWorkContent] = useState("");
  const [jobPostServiceSubject, setJobPostServiceSubject] = useState([]);
  const [jobPostServiceType, setJobPostServiceType] = useState([]);
  const [jobPostEmploymentType, setJobPostEmploymentType] = useState([]);
  const [jobPostSalaryType, setJobPostSalaryType] = useState("");

  // 数値（送信用の生値）
  const [jobPostSalaryMax, setJobPostSalaryMax] = useState(0);
  const [jobPostSalaryMin, setJobPostSalaryMin] = useState(0);
  // 表示用（編集中はカンマ無し、compositionend/blurでカンマ付与）
  const [jobPostSalaryMinDisplay, setJobPostSalaryMinDisplay] = useState("");
  const [jobPostSalaryMaxDisplay, setJobPostSalaryMaxDisplay] = useState("");
  // IME合成中フラグ
  const [isComposingMin, setIsComposingMin] = useState(false);
  const [isComposingMax, setIsComposingMax] = useState(false);

  const [jobPostSalaryRemarks, setJobPostSalaryRemarks] = useState("");
  const [jobPostExpectedIncome, setJobPostExpectedIncome] = useState(`例）
【看護師/未経験】
・入職1年目：390万円
・入職2年目：450万円
【看護師/経験5年】
・入職1年目：500万円
・入職2年目：600万円`);
  const [jobPostTreatmentType, setJobPostTreatmentType] = useState([]);
  const [jobPostTreatmentContent, setJobPostTreatmentContent] = useState("");
  const [jobPostWorkTimeType, setJobPostWorkTimeType] = useState([]);
  const [jobPostWorkTimeContent, setJobPostWorkTimeContent] = useState("");
  const [jobPostRestType, setJobPostRestType] = useState([]);
  const [jobPostRestContent, setJobPostRestContent] = useState("");
  const [jobPostSpecialContent, setJobPostSpecialContent] = useState("");
  const [jobPostEducationContent, setJobPostEducationContent] = useState("");
  const [jobPostQualificationType, setJobPostQualificationType] = useState([]);
  const [jobPostQualificationOther, setJobPostQualificationOther] =
    useState("");
  const [jobPostQualificationContent, setJobPostQualificationContent] =
    useState("");
  const [jobPostQualificationWelcome, setJobPostQualificationWelcome] =
    useState("");
  const [jobPostProcess, setJobPostProcess] = useState(`
        1：応募フォームよりご応募ください
        ↓
        2：採用担当より面接日程の調整などの連絡をさせていただきます
        ↓
        3：面接実施
        ↓
        4：採用決定のご連絡
        ↓
        5：入職手続きを進めます

        ※応募から内定までは平均1週間～1か月ほどになります。
        ※在職中で今すぐ転職が難しい方も調整のご相談が可能です。
    `);

  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [photoSelectModalVisible, setPhotoSelectModalVisible] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Add state for image editing
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const facilityId = pathname.split("/")[3];

  const SHEET_ID = import.meta.env.VITE_APP_SHEET_ID;
  const API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;
  const RANGE = "Sheet1!A1:BS411";

  const fetchSheetData = async () => {
    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
      );
      const original = response.data.values || [];

      // Transpose rows and columns
      const transposed = original[0]
        ? original[0].map((_, colIndex) =>
            original.map((row) => row[colIndex] || "")
          )
        : [];

      const searchByJobType = transposed.filter(
        (col) => col[0] === jobPostTypeDetail
      );
      const indexesOfTrue = searchByJobType[0]
        .map((col, index) => {
          if (col === "〇") {
            return index;
          } else return;
        })
        .filter((index) => index !== undefined);
      const conditions = indexesOfTrue.map((index) => transposed[2][index]);
      setSheetData(conditions);
    } catch (error) {
      console.error("シートデータの取得に失敗しました:", error);
    }
  };

  useEffect(() => {
    fetchSheetData();
  }, [jobPostTypeDetail]);

  const editorStyle = {
    width: "80%",
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

  // ====== 給与入力（IME対策版） ======
  const handleSalaryMinChange = (e) => {
    const raw = e.target.value;
    if (isComposingMin) {
      // 合成中は何もしない（表示はそのまま）
      setJobPostSalaryMinDisplay(raw);
      return;
    }
    const digits = onlyDigits(raw);
    setJobPostSalaryMinDisplay(digits); // 入力中は整形しない
    setJobPostSalaryMin(digits ? parseInt(digits, 10) : 0);
  };

  const handleSalaryMaxChange = (e) => {
    const raw = e.target.value;
    if (isComposingMax) {
      setJobPostSalaryMaxDisplay(raw);
      return;
    }
    const digits = onlyDigits(raw);
    setJobPostSalaryMaxDisplay(digits);
    setJobPostSalaryMax(digits ? parseInt(digits, 10) : 0);
  };

  const handleMinCompositionStart = () => setIsComposingMin(true);
  const handleMaxCompositionStart = () => setIsComposingMax(true);

  const handleMinCompositionEnd = (e) => {
    setIsComposingMin(false);
    const digits = onlyDigits(e.target.value);
    setJobPostSalaryMinDisplay(withComma(digits)); // ここで初めて整形
    setJobPostSalaryMin(digits ? parseInt(digits, 10) : 0);
  };
  const handleMaxCompositionEnd = (e) => {
    setIsComposingMax(false);
    const digits = onlyDigits(e.target.value);
    setJobPostSalaryMaxDisplay(withComma(digits));
    setJobPostSalaryMax(digits ? parseInt(digits, 10) : 0);
  };

  const handleMinBlur = (e) => {
    const digits = onlyDigits(e.target.value);
    setJobPostSalaryMinDisplay(withComma(digits));
    setJobPostSalaryMin(digits ? parseInt(digits, 10) : 0);
  };
  const handleMaxBlur = (e) => {
    const digits = onlyDigits(e.target.value);
    setJobPostSalaryMaxDisplay(withComma(digits));
    setJobPostSalaryMax(digits ? parseInt(digits, 10) : 0);
  };

  const workItemOptions = Object.keys(Features.DESCRIPTION).map((workItem) => ({
    value: workItem,
    label: workItem,
  }));

  const serviceSubjectOptions = Object.keys(Features.MEDICAL_DEPARTMENT).map(
    (serviceSubject) => ({
      value: serviceSubject,
      label: serviceSubject,
    })
  );

  const serviceTypeOptions = Object.keys(Features.SERVICE_TYPES).map(
    (serviceType) => ({
      value: serviceType,
      label: serviceType,
    })
  );

  const employmentTypeOptions = Object.keys(EmploymentType).map(
    (employmentType) => ({
      value: employmentType,
      label: employmentType,
    })
  );

  const salaryTypeOptions = Object.keys(Paysystems).map((salaryType) => ({
    value: salaryType,
    label: salaryType,
  }));

  const jobPostTreatmentTypeOptions = Object.keys(
    Features.SALARY_BENEFITS_WELFARE
  ).map((treatmentType) => ({
    value: treatmentType,
    label: treatmentType,
  }));

  const jobPostWorkTimeTypeOptions = Object.keys(Features.WORKING_HOURS).map(
    (workTimeType) => ({
      value: workTimeType,
      label: workTimeType,
    })
  );

  const jobPostRestTypeOptions = Object.keys(Features.HOLIDAY).map(
    (restType) => ({
      value: restType,
      label: restType,
    })
  );

  const jobPostEducationTypeOptions = Object.keys(Features.EDUCATION).map(
    (educationType) => ({
      value: educationType,
      label: educationType,
    })
  );

  const jobPostQualificationTypeOptions = Object.keys(
    Qualifications.REQUIRED
  ).map((qualificationType) => ({
    value: qualificationType,
    label: qualificationType,
  }));

  const jobPostQualificationOtherOptions = Object.keys(
    Qualifications.OTHERS
  ).map((qualificationOther) => ({
    value: qualificationOther,
    label: qualificationOther,
  }));

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Handle the edited image save
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
    if (jobPostPicture.length >= 10) {
      toast.error("最大10枚までしか選択できません");
      return;
    }

    // Add only the edited image to the file list
    setJobPostPicture((prev) => [...prev, newFile]);
    setEditModalVisible(false);
    setCurrentImage(null);
  };

  // Remove a file from the list
  const handleRemove = (file) => {
    const newFileList = jobPostPicture.filter((item) => item.uid !== file.uid);
    setJobPostPicture(newFileList);
  };

  const handleUpload = async () => {
    // 新規画像と既存画像に分ける
    const newImages = jobPostPicture.filter((pic) => pic.originFileObj);
    const existingImages = jobPostPicture.filter((pic) => !pic.originFileObj);

    let uploadedFileUrls = [];
    let uploadedFiles = [];

    if (newImages.length > 0) {
      const formData = new FormData();
      newImages.forEach((file) => {
        formData.append("files", file.originFileObj);
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
        //toast.success("写真のアップロードが完了しました");
        uploadedFileUrls = response.data.files.map((item) => item.fileUrl);
        uploadedFiles = response.data.files;
      } catch (error) {
        toast.error("写真アップロード失敗");
        return { fileUrls: [], files: [] };
      }
    }

    // 既存画像のURLを抽出（重複している可能性がないか確認）
    const existingUrls = existingImages.map((image) => image.url);

    // 両方を統合して返す
    return {
      fileUrls: [...uploadedFileUrls, ...existingUrls],
      files: uploadedFiles,
    };
  };

  const handleSubmit = async (allowed) => {
    // バリデーションチェック（失敗した場合は早期リターン）
    if (jobPostTypeDetail === "")
      return toast.error("募集職種を選択してください。");
    if (jobPostSubTitle === "")
      return toast.error("訴求文タイトルを入力してください。");
    if (jobPostSubDescription === "")
      return toast.error("訴求文を入力してください。");
    if (jobPostWorkItem.length === 0)
      return toast.error("仕事内容を選択してください。");
    if (jobPostWorkContent === "")
      return toast.error("仕事内容を入力してください。");
    if (jobPostEmploymentType.length === 0)
      return toast.error("雇用形態を選択してください。");
    if (jobPostSalaryType === "")
      return toast.error("給与体系を入力してください。");
    if (jobPostSalaryMin === 0 || jobPostSalaryMax === 0)
      return toast.error("給与下限・上限を入力してください。");
    if (jobPostWorkTimeType.length === 0 && jobPostWorkTimeContent === "")
      return toast.error("勤務時間を選択してください。");
    if (jobPostRestType.length === 0 && jobPostRestContent === "")
      return toast.error("休日を選択してください。");
    if (jobPostQualificationContent === "")
      return toast.error("応募要件を入力してください。");
    if (jobPostProcess === "")
      return toast.error("選考プロセスを入力してください。");

    setLoading(true);
    try {
      const uploadResult = await handleUpload();
      const newUrls = uploadResult.fileUrls || [];
      const uploadUrls = uploadResult.files || [];
      const existingUrls = jobPostPicture
        .filter((p) => !p.originFileObj)
        .map((p) => p.url);
      const allUrls = Array.from(new Set([...newUrls, ...existingUrls]));

      const JobPostData = {
        facility_id: facility.facility_id,
        customer_id: customerUser.customerId,
        type: jobPostTypeDetail,
        picture: allUrls,
        sub_title: jobPostSubTitle,
        sub_description: jobPostSubDescription,
        work_item: jobPostWorkItem,
        work_content: jobPostWorkContent,
        service_subject: jobPostServiceSubject,
        service_type: jobPostServiceType,
        employment_type: jobPostEmploymentType,
        salary_type: jobPostSalaryType,
        salary_min: jobPostSalaryMin,
        salary_max: jobPostSalaryMax,
        salary_remarks: jobPostSalaryRemarks,
        expected_income: jobPostExpectedIncome,
        treatment_type: jobPostTreatmentType,
        treatment_content: jobPostTreatmentContent,
        work_time_type: jobPostWorkTimeType,
        work_time_content: jobPostWorkTimeContent,
        rest_type: jobPostRestType,
        rest_content: jobPostRestContent,
        special_content: jobPostSpecialContent,
        education_content: jobPostEducationContent,
        qualification_type: jobPostQualificationType,
        qualification_other: jobPostQualificationOther,
        qualification_content: jobPostQualificationContent,
        qualification_welcome: jobPostQualificationWelcome,
        allowed: allowed ? "pending" : "draft",
        process: jobPostProcess,
      };

      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/photo/image`,
        uploadUrls || []
      );

      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/jobpost`,
        JobPostData
      );
      if (response.data.error || response.data.isAuthError)
        toast.error(response.data.error);

      // 各フォームのリセット
      setJobPostType("");
      setJobPostTypeDetail("");
      setJobPostPicture([]);
      setJobPostSubTitle("");
      setJobPostSubDescription("");
      setJobPostWorkItem([]);
      setJobPostWorkContent("");
      setJobPostServiceSubject([]);
      setJobPostServiceType([]);
      setJobPostEmploymentType([]);
      setJobPostSalaryType("");
      setJobPostSalaryMin(0);
      setJobPostSalaryMax(0);
      setJobPostSalaryMinDisplay("");
      setJobPostSalaryMaxDisplay("");
      setJobPostSalaryRemarks("");
      setJobPostExpectedIncome(0);
      setJobPostTreatmentType([]);
      setJobPostTreatmentContent("");
      setJobPostWorkTimeType([]);
      setJobPostWorkTimeContent("");
      setJobPostRestType([]);
      setJobPostRestContent("");
      setJobPostSpecialContent("");
      setJobPostEducationContent("");
      setJobPostQualificationType([]);
      setJobPostQualificationOther("");
      setJobPostQualificationContent("");
      setJobPostQualificationWelcome("");
      setJobPostProcess("");

      if (allowed) {
        setSuccessModal(true);
      } else {
        setDraftModal(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getFacility = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/facility/${facilityId}`
    );
    if (response.data.error) toast.error(response.data.error);
    if (response.data.isAuthError) return;
    setFacility(response.data.facility);
  };

  useEffect(() => {
    document.title = "求人登録・編集 | JobJob (ジョブジョブ)";
    getFacility();
  }, []);

  const createProcessedImage = async (base64) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = base64;

    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set output dimensions with 4:3 aspect ratio
        const outputHeight = 768;
        const outputWidth = Math.round(outputHeight * (4 / 3)); // 1024 for 4:3 ratio

        // Set canvas to the output dimensions
        canvas.width = outputWidth;
        canvas.height = outputHeight;

        // Fill with white background
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Calculate dimensions to fit by height
        const scale = outputHeight / image.height;
        const scaledWidth = image.width * scale;

        // Calculate x-offset for centering (with cropping or padding as needed)
        let xOffset = 0;
        if (scaledWidth > outputWidth) {
          // Image is too wide after scaling to height - crop the sides
          xOffset = (outputWidth - scaledWidth) / 2; // negative -> crop sides
        } else {
          // narrower -> center with padding
          xOffset = (outputWidth - scaledWidth) / 2;
        }

        // Draw the image centered horizontally, full height
        ctx.drawImage(image, xOffset, 0, scaledWidth, outputHeight);

        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              console.error("Canvas is empty");
              return;
            }

            blob.name = "processed.jpeg";
            const processedFile = new File([blob], "processed.jpeg", {
              type: "image/jpeg",
            });
            resolve({
              file: processedFile,
              preview: URL.createObjectURL(blob),
            });
          },
          "image/jpeg",
          0.9
        );
      };
    });
  };

  return (
    <>
      <Helmet>
        <title>求人登録・編集 | JobJob (ジョブジョブ)</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {loading ? <Loading /> : <></>}
      <div className="w-full min-h-screen bg-white rounded-lg shadow-xl p-4">
        <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434]">
          求人を新規登録
        </p>
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            募集職種
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start gap-2 w-3/4">
            <Select
              placeholder="職種"
              options={jobTypesOptions}
              value={jobPostType}
              onChange={(value) => setJobPostType(value)}
              className="w-1/3"
            />
            {jobPostType && (
              <Select
                placeholder="職種"
                options={jobTypeDetailOptions(jobPostType)}
                value={jobPostTypeDetail}
                onChange={(value) => setJobPostTypeDetail(value)}
                className="w-1/3"
              />
            )}
          </div>
        </div>
        <div className="flex items-start mt-4">
          <div className="flex items-center justify-start gap-1 w-1/5">
            <span className="lg:text-sm text-xs text-[#343434]">写真</span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <Upload
              maxCount={10}
              name="avatar"
              listType="picture-card"
              fileList={jobPostPicture}
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
                  // Create a file input element
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // Check file size (limit to 5MB)
                      if (file.size > 5 * 1024 * 1024) {
                        toast.error("ファイルサイズは5MB以下にしてください");
                        return;
                      }

                      getBase64(file)
                        .then((base64) => {
                          // Instead of showing the modal, directly process the image
                          createProcessedImage(base64).then(
                            (processedImage) => {
                              handleEditSave(processedImage);
                            }
                          );
                        })
                        .catch((error) => {
                          console.error("File processing error:", error);
                          toast.error("ファイル処理中にエラーが発生しました");
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
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            訴求文タイトル
            <span className="text[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <Input
            value={jobPostSubTitle}
            onChange={(e) => setJobPostSubTitle(e.target.value)}
            className="w-1/2"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">
            訴求文
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <TextArea
            value={jobPostSubDescription}
            onChange={(e) => setJobPostSubDescription(e.target.value)}
            className="w-1/2"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">
            仕事内容（選択）
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          {jobPostTypeDetail ? (
            <Checkbox.Group
              options={workItemOptions.filter((item) =>
                sheetData.includes(item.value)
              )}
              onChange={(value) => setJobPostWorkItem(value)}
              className="w-4/5"
            />
          ) : (
            <p className="lg:text-sm text-xs w-4/5">職種を選択してください</p>
          )}
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">
            仕事内容
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <TextArea
            value={jobPostWorkContent}
            onChange={(e) => setJobPostWorkContent(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">診療科目</p>
          {jobPostTypeDetail ? (
            <Checkbox.Group
              options={serviceSubjectOptions.filter((item) =>
                sheetData.includes(item.value)
              )}
              value={jobPostServiceSubject}
              onChange={(value) => setJobPostServiceSubject(value)}
              className="w-4/5"
            />
          ) : (
            <p className="lg:text-sm text-xs w-4/5">職種を選択してください</p>
          )}
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">サービス形態</p>
          {jobPostTypeDetail ? (
            <Checkbox.Group
              options={serviceTypeOptions.filter((item) =>
                sheetData.includes(item.value)
              )}
              value={jobPostServiceType}
              onChange={(value) => setJobPostServiceType(value)}
              className="w-4/5"
            />
          ) : (
            <p className="lg:text-sm text-xs w-4/5">職種を選択してください</p>
          )}
        </div>
        <div className="flex items-start mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            雇用形態
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start gap-2 w-4/5">
            <Radio.Group
              options={employmentTypeOptions}
              value={jobPostEmploymentType}
              onChange={(e) => setJobPostEmploymentType(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex items-start mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            給与体系
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start gap-2 w-4/5">
            <Radio.Group
              options={salaryTypeOptions}
              value={jobPostSalaryType}
              onChange={(e) => setJobPostSalaryType(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* ===== IME対応済み・給与下限/上限 ===== */}
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/5">
            給与下限・上限
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start w-4/5">
            <Input
              value={jobPostSalaryMinDisplay}
              onChange={handleSalaryMinChange}
              onCompositionStart={handleMinCompositionStart}
              onCompositionEnd={handleMinCompositionEnd}
              onBlur={handleMinBlur}
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-1/4"
              placeholder="0"
            />
            <span className="mx-2 lg:text-sm text-xs">円</span>
            <span className="mx-2">~</span>
            <Input
              value={jobPostSalaryMaxDisplay}
              onChange={handleSalaryMaxChange}
              onCompositionStart={handleMaxCompositionStart}
              onCompositionEnd={handleMaxCompositionEnd}
              onBlur={handleMaxBlur}
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-1/4"
              placeholder="0"
            />
            <span className="mx-2 lg:text-sm text-xs">円</span>
          </div>
        </div>

        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">給与備考</p>
          <div className="flex items-center justify-start w-4/5">
            <TextArea
              value={jobPostSalaryRemarks}
              onChange={(e) => setJobPostSalaryRemarks(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex items-start mt-4 desireEmployment textarea">
          <p className="lg:text-sm text-xs w-1/5">想定年収</p>
          <TextArea
            value={jobPostExpectedIncome}
            onChange={(e) => setJobPostExpectedIncome(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">待遇（選択）</p>
          {jobPostTypeDetail ? (
            <Checkbox.Group
              options={jobPostTreatmentTypeOptions.filter((item) =>
                sheetData.includes(item.value)
              )}
              value={jobPostTreatmentType}
              onChange={(value) => setJobPostTreatmentType(value)}
              className="w-4/5"
            />
          ) : (
            <p className="lg:text-sm text-xs w-4/5">職種を選択してください</p>
          )}
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">待遇</p>
          <TextArea
            value={jobPostTreatmentContent}
            onChange={(e) => setJobPostTreatmentContent(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">
            勤務時間・休憩時間
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          {jobPostTypeDetail ? (
            <Checkbox.Group
              options={jobPostWorkTimeTypeOptions.filter((item) =>
                sheetData.includes(item.value)
              )}
              value={jobPostWorkTimeType}
              onChange={(value) => setJobPostWorkTimeType(value)}
              className="w-4/5"
            />
          ) : (
            <p className="lg:text-sm text-xs w-4/5">職種を選択してください</p>
          )}
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5"></p>
          <TextArea
            value={jobPostWorkTimeContent}
            onChange={(e) => setJobPostWorkTimeContent(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">
            休日
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          {jobPostTypeDetail ? (
            <Checkbox.Group
              options={jobPostRestTypeOptions.filter((item) =>
                sheetData.includes(item.value)
              )}
              value={jobPostRestType}
              onChange={(value) => setJobPostRestType(value)}
              className="w-4/5"
            />
          ) : (
            <p className="lg:text-sm text-xs w-4/5">職種を選択してください</p>
          )}
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5"></p>
          <TextArea
            value={jobPostRestContent}
            onChange={(e) => setJobPostRestContent(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">長期休暇・特別休暇</p>
          <TextArea
            value={jobPostSpecialContent}
            onChange={(e) => setJobPostSpecialContent(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">教育体制・研修</p>
          {jobPostTypeDetail ? (
            <Checkbox.Group
              options={jobPostEducationTypeOptions.filter((item) =>
                sheetData.includes(item.value)
              )}
              value={jobPostEducationContent}
              onChange={(value) => setJobPostEducationContent(value)}
              className="w-4/5"
            />
          ) : (
            <p className="lg:text-sm text-xs w-4/5">職種を選択してください</p>
          )}
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">応募要件（資格）</p>
          {jobPostTypeDetail ? (
            <Checkbox.Group
              options={jobPostQualificationTypeOptions.filter((item) =>
                sheetData.includes(item.value)
              )}
              value={jobPostQualificationType}
              onChange={(value) => setJobPostQualificationType(value)}
              className="w-4/5"
            />
          ) : (
            <p className="lg:text-sm text-xs w-4/5">職種を選択してください</p>
          )}
        </div>
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/5">応募要件（他条件）</p>
          {jobPostTypeDetail ? (
            <Checkbox.Group
              options={jobPostQualificationOtherOptions.filter((item) =>
                sheetData.includes(item.value)
              )}
              value={jobPostQualificationOther}
              onChange={(value) => setJobPostQualificationOther(value)}
              className="w-4/5"
            />
          ) : (
            <p className="lg:text-sm text-xs w-4/5">職種を選択してください</p>
          )}
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">
            応募要件
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <TextArea
            value={jobPostQualificationContent}
            onChange={(e) => setJobPostQualificationContent(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">歓迎要件</p>
          <TextArea
            value={jobPostQualificationWelcome}
            onChange={(e) => setJobPostQualificationWelcome(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/5">
            選考プロセス
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <TextArea
            value={jobPostProcess}
            onChange={(e) => setJobPostProcess(e.target.value)}
            className="w-4/5"
          />
        </div>
        <div className="flex items-center justify-center w-full mt-8 gap-4 border-t-[1px] border-[#e7e7e7] pt-4">
          <Link
            to={"/customers/facility"}
            className="lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-3 duration-300"
          >
            キャンセル
          </Link>
          <button
            className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300"
            onClick={() => handleSubmit(false)}
          >
            下書き保存
          </button>
          <button
            className="lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300"
            onClick={() => handleSubmit(true)}
          >
            求人を申請する
          </button>
        </div>
      </div>
      <PhotoSelectModal
        visible={photoSelectModalVisible}
        onCancel={() => setPhotoSelectModalVisible(false)}
        onSelect={(selected) => {
          const formattedPhotos = selected.map((photo, index) => ({
            uid: `existing-${Date.now()}-${Math.random()}`, // 常に新規の一意キーを生成
            name: `Photo ${jobPostPicture.length + index + 1}`,
            url: photo.photoUrl,
            status: "done",
          }));
          // 現在の画像枚数と新たに選択された画像枚数を合わせる
          const totalPhotos = jobPostPicture.length + formattedPhotos.length;
          if (totalPhotos > 10) {
            toast.error("最大10枚までしか選択できません");
            return;
          }
          setJobPostPicture((prev) => [...prev, ...formattedPhotos]);
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

      <Modal
        open={draftModal}
        onCancel={() => setDraftModal(false)}
        footer={null}
        width={600}
        className="modal"
      >
        <div className="flex flex-col">
          <p className="text-lg font-bold text-[#343434] pl-4">
            求人情報を下書き保存しました。
          </p>
          <p className="text-sm text-[#343434] mt-4">
            再開する場合は、求人編集から再開してください。
          </p>
          <Link
            to="/customers/facility"
            className="text-center text-blue-500 mt-4"
          >
            求人一覧へ戻る
          </Link>
        </div>
      </Modal>
      <Modal
        open={successModal}
        onCancel={() => setSuccessModal(false)}
        footer={null}
        width={600}
        className="modal"
      >
        <div className="flex flex-col">
          <p className="text-lg font-bold text-[#343434] pl-4">
            求人の掲載申請を行いました。
          </p>
          <p className="text-sm text-[#343434] mt-4">
            ジョブジョブ運営事務局での内容確認後の1～2営業日で求人情報を公開致します。
          </p>
          <Link
            to="/customers/facility"
            className="text-center text-blue-500 mt-4"
          >
            求人一覧へ戻る
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default AddJobPost;
