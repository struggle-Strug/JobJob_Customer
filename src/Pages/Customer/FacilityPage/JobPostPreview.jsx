import { Modal, Carousel } from "antd";
import React, { useRef, useState } from "react";

const JobPostPreview = ({ open, onCancel, data }) => {
  const previewCarouselRef = useRef(null);
  const [previewCurrentSlide, setPreviewCurrentSlide] = useState(0);

  // Format pictures array - handle both url strings and objects
  const pictures = data?.picture || data?.photos || [];
  const pictureUrls = pictures.map(pic => 
    typeof pic === 'string' ? pic : (pic?.url || pic?.photoUrl || pic)
  ).filter(Boolean);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1000}
      bodyStyle={{ maxHeight: '80vh', overflowY: 'auto', backgroundColor: 'white' }}
      style={{ backgroundColor: 'white' }}
      className="modal"
    >
      <div className="mt-2 flex flex-col w-full rounded-lg">
        <div className="px-8 py-5 container flex flex-col items-stretch justify-between bg-[#F8F8F8]">
          {/* 画像カルーセル（実ページと同様のレイアウト：矢印/枚数表示付き） */}
          <div className="relative w-full px-8">
            {pictureUrls.length > 0 ? (
              <>
                <Carousel
                  ref={previewCarouselRef}
                  dots={false}
                  effect="fade"
                  lazyLoad="ondemand"
                  afterChange={(i) => setPreviewCurrentSlide(i)}
                  className="rounded-xl overflow-hidden"
                >
                  {pictureUrls.map((picUrl, idx) => (
                    <div key={idx}>
                      <img
                        src={picUrl}
                        alt={`preview-${idx}`}
                        className="w-full h-auto aspect-video block rounded-xl object-contain"
                      />
                    </div>
                  ))}
                </Carousel>

                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-10 font-noto">
                  {previewCurrentSlide + 1}/{pictureUrls.length}
                </div>

                <button
                  onClick={() => previewCarouselRef.current?.prev()}
                  className="absolute -left-[21px] top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-[42px] h-[42px] flex items-center justify-center transition-colors z-10"
                  aria-label="前の写真を表示"
                  type="button"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 13L5.27083 8L11 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  onClick={() => previewCarouselRef.current?.next()}
                  className="absolute -right-[21px] top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-[42px] h-[42px] flex items-center justify-center transition-colors z-10"
                  aria-label="次の写真を表示"
                  type="button"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L10.7292 8L5 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            ) : (
              <div className="w-full aspect-video bg-[#f2f2f2] rounded-xl flex items-center justify-center text-[#999] font-noto">
                画像がありません
              </div>
            )}
          </div>
        </div>

        {/* 以下の募集内容は画像の下でフル幅（タイトルや更新日は表示しない） */}
        <div className="container flex flex-col items-start gap-4 justify-between mt-4">
          <div className="flex flex-col w-full">
            {/* 訴求文 */}
            <div className="flex flex-col bg-[#F8F8F8] md:px-8 px-4 py-5">
              <p className="lg:text-lg font-bold text-base text-[#ff6b56] font-noto">
                {data?.sub_title || ""}
              </p>
              <pre className="lg:text-base text-sm text-[#343434] mt-2 whitespace-pre-wrap break-words font-noto">
                {data?.sub_description || ""}
              </pre>
            </div>

            {/* 募集内容 */}
            <div className="mt-6 p-2 flex items-center md:justify-start justify-center w-full">
              <p className="text-xl font-bold text-[#343434] font-noto">募集内容</p>
            </div>
            <div className="px-8 md:py-2 py-2 flex flex-col bg-[#F8F8F8] mt-4 gap-2">
              <div className="md:flex block items-start justify-start border-b border-[#e7e7e7]">
                <p className="mr-1 lg:text-sm text-sm font-bold text-[#343434] py-6 w-1/5 font-noto">
                  募集職種
                </p>
                <p className="lg:text-sm text-sm text-[#343434] py-6 w-4/5 font-noto">
                  {data?.type || ""}
                </p>
              </div>

              {/* 仕事内容 */}
              <div className="flex items-start justify-start border-b border-[#e7e7e7]">
                <p className="mr-1 lg:text-sm text-sm font-bold text-[#343434] py-6 w-1/5 font-noto">
                  仕事内容
                </p>
                <pre className="flex flex-col lg:text-sm text-sm text-[#343434] py-6 w-4/5 overflow-auto whitespace-pre-wrap break-words font-noto">
                  <div className="inline-block items-start justify-start gap-2 w-4/5">
                    {Array.isArray(data?.work_item) 
                      ? data.work_item.filter(v => v).map((item, index) => (
                          <div key={index} className="mr-1 inline-block text-center bg-[#F5BD2E] text-white px-2 py-0.5 rounded-xs">
                            <p className="text-[10px] font-bold font-noto m-0 leading-tight">{item}</p>
                          </div>
                        ))
                      : null}
                  </div>
                  <div className='mt-2'>
                    <p className="font-noto">{data?.work_content || ""}</p>
                  </div>
                </pre>
              </div>

              {/* 診療科目・サービス形態 */}
              <div className="flex items-start justify-start border-b border-[#e7e7e7]">
                <p className="mr-1 lg:text-sm text-sm font-bold text-[#343434] py-6 w-1/5 font-noto">
                  診療科目・サービス形態
                </p>
                <div className="inline-block items-start justify-start gap-2 w-4/5 py-6">
                  {(Array.isArray(data?.service_subject) ? data.service_subject : [])
                    .concat(Array.isArray(data?.service_type) ? data.service_type : [])
                    .filter(v => v)
                    .map((item, index) => (
                      <div key={index} className="mr-1 inline-block text-center bg-[#F5BD2E] text-white px-2 py-0.5 rounded-xs font-noto">
                        <p className="text-[10px] font-bold font-noto m-0 leading-tight">{item}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* 給与 */}
              <div className="flex items-start justify-start border-b border-[#e7e7e7]">
                <p className="mr-1 lg:text-sm text-sm font-bold text-[#343434] py-6 w-1/5 font-noto">
                  給与
                </p>
                <p className="lg:text-sm text-sm text-[#343434] py-6 w-4/5 font-noto">
                  {`【${Array.isArray(data?.employment_type) ? data.employment_type.join('・') : (data?.employment_type || '')}】 ${data?.salary_type || ''} ${data?.salary_min || 0}円〜${data?.salary_max || 0}円`}
                </p>
              </div>

              {/* 給与の備考 */}
              <div className="flex items-start justify-start border-b border-[#e7e7e7]">
                <p className="mr-1 lg:text-sm text-sm font-bold text-[#343434] py-6 w-1/5 font-noto">
                  給与の備考
                </p>
                <div className="lg:text-sm text-sm text-[#343434] py-6 w-4/5 overflow-auto font-noto">
                  <pre className="whitespace-pre-wrap break-words font-noto">{data?.salary_remarks || ''}</pre>
                </div>
              </div>

              {/* 想定年収 */}
              <div className="flex items-start justify-start border-b border-[#e7e7e7]">
                <p className="mr-1 lg:text-sm text-sm font-bold text-[#343434] py-6 w-1/5 font-noto">
                  想定年収
                </p>
                <div className="lg:text-sm text-sm text-[#343434] py-6 w-4/5 overflow-auto font-noto">
                  <pre className="whitespace-pre-wrap break-words font-noto">{data?.expected_income || ''}</pre>
                </div>
              </div>

              {/* 待遇 */}
              <div className="flex items-start justify-start border-b border-[#e7e7e7]">
                <p className="mr-1 lg:text-sm text-sm font-bold text-[#343434] py-6 w-1/5 font-noto">
                  待遇
                </p>
                <div className="flex flex-col w-4/5 py-6">
                  <div className="inline-block items-start justify-start gap-2">
                    {(Array.isArray(data?.treatment_type) ? data.treatment_type : []).filter(v => v).map((item, index) => (
                      <div key={index} className="mr-1 inline-block text-center bg-[#F5BD2E] text-white px-2 py-0.5 rounded-xs font-noto">
                        <p className="text-[10px] font-bold font-noto m-0 leading-tight">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="lg:text-sm text-sm text-[#343434] mt-4 overflow-auto font-noto">
                    <pre className="whitespace-pre-wrap break-words font-noto">{data?.treatment_content || ''}</pre>
                  </div>
                </div>
              </div>

              {/* 長期休暇・特別休暇 */}
              <div className="flex items-start justify-start border-b border-[#e7e7e7]">
                <p className="mr-1 lg:text-sm text-sm font-bold text-[#343434] py-6 w-1/5 font-noto">
                  長期休暇・特別休暇
                </p>
                <div className="lg:text-sm text-sm text-[#343434] py-6 w-4/5 overflow-auto font-noto">
                  <pre className="whitespace-pre-wrap break-words font-noto">{data?.special_content || ''}</pre>
                </div>
              </div>

              {/* 教育体制・研修 */}
              <div className="flex items-start justify-start border-b border-[#e7e7e7]">
                <p className="mr-1 lg:text-sm text-sm font-bold text-[#343434] py-6 w-1/5 font-noto">
                  教育体制・研修
                </p>
                <div className="inline-block items-start justify-start gap-2 w-4/5 py-6">
                  {(Array.isArray(data?.education_content) ? data.education_content : []).filter(v => v).map((item, index) => (
                    <div key={index} className="mr-1 inline-block text-center bg-[#F5BD2E] text-white px-2 py-0.5 rounded-xs font-noto">
                      <p className="text-[10px] font-bold font-noto m-0 leading-tight">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 勤務時間 */}
              <div className="flex items-start justify-start border-b border-[#e7e7e7]">
                <p className="mr-1 lg:text-sm text-sm font-bold text-[#343434] py-6 w-1/5 font-noto">
                  勤務時間
                </p>
                <div className="flex flex-col w-4/5 py-6">
                  <div className="inline-block items-start justify-start gap-2">
                    {(Array.isArray(data?.work_time_type) ? data.work_time_type : []).filter(v => v).map((item, index) => (
                      <div key={index} className="mr-1 inline-block text-center bg-[#F5BD2E] text-white px-2 py-0.5 rounded-xs font-noto">
                        <p className="text-[10px] font-bold font-noto m-0 leading-tight">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="lg:text-sm text-sm text-[#343434] mt-4 overflow-auto font-noto">
                    <pre className="whitespace-pre-wrap break-words font-noto">{data?.work_time_content || ''}</pre>
                  </div>
                </div>
              </div>

              {/* 休日 */}
              <div className="flex items-start justify-start border-b border-[#e7e7e7]">
                <p className="mr-1 lg:text-sm text-sm font-bold text-[#343434] py-6 w-1/5 font-noto">
                  休日
                </p>
                <div className="flex flex-col w-4/5 py-6">
                  <div className="inline-block items-start justify-start gap-2">
                    {(Array.isArray(data?.rest_type) ? data.rest_type : []).filter(v => v).map((item, index) => (
                      <div key={index} className="mr-1 inline-block text-center bg-[#F5BD2E] text-white px-2 py-0.5 rounded-xs font-noto">
                        <p className="text-[10px] font-bold font-noto m-0 leading-tight">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="lg:text-sm text-sm text-[#343434] mt-4 overflow-auto font-noto">
                    <pre className="whitespace-pre-wrap break-words font-noto">{data?.rest_content || ''}</pre>
                  </div>
                </div>
              </div>

              {/* 応募要件 */}
              <div className="flex items-start justify-start border-b border-[#e7e7e7]">
                <p className="mr-1 lg:text-sm text-sm font-bold text-[#343434] py-6 w-1/5 font-noto">
                  応募要件
                </p>
                <div className="flex flex-col w-4/5 py-6">
                  <div className="inline-block items-start justify-start gap-2">
                    {(Array.isArray(data?.qualification_type) ? data.qualification_type : [])
                      .concat(Array.isArray(data?.qualification_other) ? data.qualification_other : [])
                      .filter(v => v)
                      .map((item, index) => (
                        <div key={index} className="mr-1 inline-block text-center bg-[#F5BD2E] text-white px-2 py-0.5 rounded-xs font-noto">
                          <p className="text-[10px] font-bold font-noto m-0 leading-tight">{item}</p>
                        </div>
                      ))}
                  </div>
                  <div className="lg:text-sm text-sm text-[#343434] mt-4 overflow-auto font-noto">
                    <pre className="whitespace-pre-wrap break-words font-noto">{data?.qualification_content || ''}</pre>
                  </div>
                </div>
              </div>

              {/* 歓迎要件 */}
              <div className="flex items-start justify-start border-b border-[#e7e7e7]">
                <p className="mr-1 lg:text-sm text-sm font-bold text-[#343434] py-6 w-1/5 font-noto">
                  歓迎要件
                </p>
                <div className="lg:text-sm text-sm text-[#343434] py-6 w-4/5 overflow-auto font-noto">
                  <pre className="whitespace-pre-wrap break-words font-noto">{data?.qualification_welcome || ''}</pre>
                </div>
              </div>

              {/* 選考プロセス */}
              <div className="flex items-start justify-start">
                <p className="mr-1 lg:text-sm text-sm font-bold text-[#343434] py-6 w-1/5 font-noto">
                  選考プロセス
                </p>
                <div className="lg:text-sm text-sm text-[#343434] py-6 w-4/5 overflow-auto font-noto">
                  <pre className="whitespace-pre-wrap break-words font-noto">{data?.process || ''}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default JobPostPreview;