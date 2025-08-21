import { Modal } from "antd";
import React from "react";

const JobPostPreview = ({ open, onCancel, data }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      className="modal"
    >
      <div className="w-full min-h-screen flex flex-col p-4 bg-white rounded-lg mb-8">
        <h1 className="lg:text-2xl md:text-base text-sm font-bold">
          求人プレビュー
        </h1>

        {/* 募集職種 */}
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/4">
            募集職種
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start gap-2 w-3/4">
            <p className="lg:text-sm text-xs text-[#343434] w-3/4">
              {data?.type}
            </p>
          </div>
        </div>

        {/* 写真 */}
        <div className="flex items-start mt-4">
          <div className="flex items-center justify-start gap-1 w-1/4">
            <span className="lg:text-sm text-xs text-[#343434] w-3/4">
              写真
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto w-3/4">
            {data?.photos?.map((photo, index) => (
              <img
                key={index}
                src={photo.url}
                alt="jobPostPhoto"
                className={`w-20 flex-shrink-0 object-${(80/80 < photo.photoWidth / photo.photoHeight) ? "cover" : "contain"}`}
              />
            ))}
          </div>
        </div>

        {/* 訴求文タイトル */}
        <div className="flex items-start mt-4">
          <p className="lg:text-sm text-xs w-1/4">
            訴求文タイトル
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.sub_title}
          </p>
        </div>

        {/* 訴求文 */}
        <div className="flex items-start mt-4">
          <p className="lg:text-sm text-xs w-1/4">
            訴求文
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div
            className="w-3/4"
            dangerouslySetInnerHTML={{ __html: data?.sub_description }}
          />
        </div>

        {/* 仕事内容（選択） */}
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">
            仕事内容（選択）
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {Array.isArray(data?.work_item)
              ? data.work_item.join(",")
              : data?.work_item}
          </p>
        </div>

        {/* 仕事内容 */}
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">
            仕事内容
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <p
            style={{ whiteSpace: "pre-wrap" }}
            className="lg:text-sm text-xs text-[#343434] w-3/4"
          >
            {data?.work_content}
          </p>
        </div>

        {/* 診療科目 */}
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">診療科目</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {Array.isArray(data?.service_subject)
              ? data.service_subject.join(",")
              : data?.service_subject}
          </p>
        </div>

        {/* サービス形態 */}
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">サービス形態</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {Array.isArray(data?.service_type)
              ? data.service_type.join(",")
              : data?.service_type}
          </p>
        </div>

        {/* 雇用形態 */}
        <div className="flex items-start mt-4">
          <p className="lg:text-sm text-xs w-1/4">
            雇用形態
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start gap-2 w-3/4">
            <p className="lg:text-sm text-xs text-[#343434]">
              {Array.isArray(data?.employment_type)
                ? data.employment_type.join(",")
                : data?.employment_type}
            </p>
          </div>
        </div>

        {/* 給与体系 */}
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/4">
            給与体系
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start gap-2 w-3/4">
            <p className="lg:text-sm text-xs text-[#343434]">
              {data?.salary_type}
            </p>
          </div>
        </div>

        {/* 給与下限・上限 */}
        <div className="flex items-center mt-4">
          <p className="lg:text-sm text-xs w-1/4">
            給与下限・上限
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <div className="flex items-center justify-start w-3/4">
            <p className="lg:text-sm text-xs text-[#343434] w-1/4">
              {data?.salary_min}
            </p>
            <span className="mx-2">~</span>
            <p className="lg:text-sm text-xs text-[#343434] w-1/4">
              {data?.salary_max}
            </p>
          </div>
        </div>

        {/* 給与備考 */}
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">給与備考</p>
          <p
            style={{ whiteSpace: "pre-wrap" }}
            className="lg:text-sm text-xs text-[#343434] w-3/4"
          >
            {data?.salary_remarks}
          </p>
        </div>

        {/* 想定年収 */}
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">想定年収</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.expected_income}
          </p>
        </div>

        {/* 待遇（選択） */}
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">待遇（選択）</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {Array.isArray(data?.treatment_type)
              ? data.treatment_type.join(",")
              : data?.treatment_type}
          </p>
        </div>

        {/* 待遇 */}
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">待遇</p>
          <p
            style={{ whiteSpace: "pre-wrap" }}
            className="lg:text-sm text-xs text-[#343434] w-3/4"
          >
            {data?.treatment_content}
          </p>
        </div>

        {/* 勤務時間・休憩時間（選択） */}
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">勤務時間・休憩時間（選択）</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {Array.isArray(data?.work_time_type)
              ? data.work_time_type.join(",")
              : data?.work_time_type}
          </p>
        </div>

        {/* 勤務時間・休憩時間 */}
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">
            勤務時間・休憩時間
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <p
            style={{ whiteSpace: "pre-wrap" }}
            className="lg:text-sm text-xs text-[#343434] w-3/4"
          >
            {data?.work_time_content}
          </p>
        </div>

        {/* 休日（選択） */}
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">
            休日（選択）
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {Array.isArray(data?.rest_type)
              ? data.rest_type.join(",")
              : data?.rest_type}
          </p>
        </div>

        {/* 休日 */}
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">
            休日
          </p>
          <p
            style={{ whiteSpace: "pre-wrap" }}
            className="lg:text-sm text-xs text-[#343434] w-3/4"
          >
            {data?.rest_content}
          </p>
        </div>

        {/* 長期休暇・特別休暇 */}
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">長期休暇・特別休暇</p>
          <p
            style={{ whiteSpace: "pre-wrap" }}
            className="lg:text-sm text-xs text-[#343434] w-3/4"
          >
            {data?.special_content}
          </p>
        </div>

        {/* 教育体制・教育 */}
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">教育体制・教育</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {Array.isArray(data?.education_content)
              ? data.education_content.join(",")
              : data?.education_content}
          </p>
        </div>

        {/* 応募要件（資格） */}
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">
            応募要件（資格）
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {Array.isArray(data?.qualification_type)
              ? data.qualification_type.join(",")
              : data?.qualification_type}
          </p>
        </div>

        {/* 応募要件（他条件） */}
        <div className="flex items-start mt-4 desireEmployment">
          <p className="lg:text-sm text-xs w-1/4">応募要件（他条件）</p>
          <p className="lg:text-sm text-xs text-[#343434] w-3/4">
            {Array.isArray(data?.qualification_other)
              ? data.qualification_other.join(",")
              : data?.qualification_other}
          </p>
        </div>

        {/* 応募要件（テキスト） */}
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">応募要件（テキスト）</p>
          <p
            style={{ whiteSpace: "pre-wrap" }}
            className="lg:text-sm text-xs text-[#343434] w-3/4"
          >
            {data?.qualification_content}
          </p>
        </div>

        {/* 歓迎要件 */}
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">歓迎要件</p>
          <p
            style={{ whiteSpace: "pre-wrap" }}
            className="lg:text-sm text-xs text-[#343434] w-3/4"
          >
            {data?.qualification_welcome}
          </p>
        </div>

        {/* 選考プロセス */}
        <div className="flex items-start mt-4 textarea">
          <p className="lg:text-sm text-xs w-1/4">
            選考プロセス
            <span className="text-[0.7rem] text-[#FF2A3B]">(必須)</span>
          </p>
          <pre className="lg:text-sm text-xs text-[#343434] w-3/4">
            {data?.process}
          </pre>
        </div>
      </div>
    </Modal>
  );
};

export default JobPostPreview;
