import { Modal, Carousel } from "antd";
import { React, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getJobValueByKey } from "../../../utils/getFunctions";
import { Facilities } from "../../../utils/constants/categories";

const FacilityPreview = ({ open, onCancel, data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef();
  useEffect(() => {
    console.log("FacilityPreview data:", data);
  }, [data]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      className="modal"
    >
      <div className="flex w-full p-8">
        <div className="container flex justify-between gap-8">
          <div className="flex flex-col items-start justify-start w-full">
            <div className="flex relative flex-col items-center justify-between bg-white rounded-2xl p-6 w-full shadow-2xl hover:scale-[1.02] duration-300">
              {/* Carousel を追加 */}
              <div className="relative w-full">
                <Carousel
                  ref={carouselRef}
                  dots={false}
                  beforeChange={(_, next) => setCurrentSlide(next)}
                >
                  {data?.photos?.length > 0 ? (
                    data.photos.map((photo, index) => (
                      <div key={index}>
                        <img
                          src={photo.url}
                          alt={`facility-photo-${index}`}
                          className={`w-full aspect-video object-cover rounded-t-xl`}
                        />
                      </div>
                    ))
                  ) : (
                    <div>
                      <img
                        src="/assets/images/noimage.png"
                        alt="no-image"
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                  )}
                </Carousel>
                {/* スライドインジケーター（画像上に表示） */}
                {data?.photo?.length > 0 && (
                  <div className="absolute top-2 right-2 bg-[#fdfcf9] text-black text-xs px-2 py-1 rounded-xl z-10 border border-[#ddccc9]">
                    {currentSlide + 1}/{data.photo.length}
                  </div>
                )}
              </div>
              {/* 矢印バー：画像直下に隙間なく配置 */}
              <div className="flex items-center justify-between w-full bg-[#fdfcf9]  h-11 rounded-b-xl border border-[#ddccc9]">
                <button
                  onClick={() => {
                    const newIndex =
                      (currentSlide - 1 + data.photo.length) %
                      data.photo.length;
                    carouselRef.current.goTo(newIndex, false);
                    setCurrentSlide(newIndex);
                  }}
                  className="bg-transparent text-[#FF6B56] border-r border-[#ddccc9] p-2 w-11 h-11 flex items-center justify-center "
                >
                  <svg
                    aria-label="前の写真を表示"
                    class="h-[13px] border-b border-transparent transition-jm group-hover:border-jm-linkHover"
                    width="24"
                    height="24"
                    role="img"
                    aria-hidden="false"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 13L5.27083 8L11 3"
                      stroke="#FF6B56"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </button>
                <p className="text-sm text-[#343434] line-clamp-1">
                  {data?.photos?.length > 0 &&
                    data.photos[currentSlide].description}
                </p>
                <button
                  onClick={() => {
                    const newIndex = (currentSlide + 1) % data.photo.length;
                    carouselRef.current.goTo(newIndex, false);
                    setCurrentSlide(newIndex);
                  }}
                  className="bg-transparent text-[#FF6B56] border-l border-[#ddccc9] p-2 w-11 h-11 flex items-center justify-center "
                >
                  <svg
                    aria-label="次の写真を表示"
                    class="h-[13px] border-b border-transparent transition-jm group-hover:border-jm-linkHover"
                    width="24"
                    height="24"
                    role="img"
                    aria-hidden="false"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L10.7292 8L5 3"
                      stroke="#FF6B56"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="flex flex-col items-start justify-start p-4 w-full h-full gap-4">
                <p className="lg:text-xl md:text-sm text-[#343434]">
                  <span className="lg:text-2xl md:text-xl font-bold">
                    {data?.name}
                  </span>
                  <span className="text-base">の求人情報</span>
                </p>
                <div>
                  <p className="lg:text-sm md:text-xs text-[#343434]">
                    {data?.prefecture}
                    {data?.city}
                    {data?.village}
                    {data?.building}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-white px-4 rounded-lg mt-8 w-full">
              <p className="lg:text-lg font-bold text-sm text-[#343434] border-b-[1px] py-6 border-[#e7e7e7]">
                事業所情報
              </p>

              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  法人・施設名
                </p>
                <Link
                  to={`/facility/${data?.facility_id}`}
                  className="lg:text-base text-sm text-[#FF2A3B] hover:underline w-4/5"
                >
                  {data?.name}
                </Link>
              </div>

              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  募集職種
                </p>
                <div className="flex flex-col items-start justify-start w-4/5">
                  {data?.jobPosts?.map((jobPost, index) => {
                    return (
                      <Link
                        key={index}
                        to={`/${getJobValueByKey(jobPost.type)}/${
                          jobPost?.jobpost_id
                        }`}
                        className="lg:text-base text-sm text-[#FF2A3B] hover:underline"
                      >
                        {jobPost?.type}({jobPost?.employment_type})
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  施設紹介
                </p>
                <p className="lg:text-base text-sm text-[#343434] w-4/5">
                  <pre>{data?.introduction}</pre>
                </p>
              </div>

              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  アクセス
                </p>
                <div className="flex flex-col items-start justify-start w-4/5">
                  <div className="inline-block items-start justify-start gap-2">
                    {data?.access.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="inline-block text-center bg-[#F5BD2E] text-white m-1 px-2 py-1 rounded-lg"
                        >
                          <p className="lg:text-[0.7rem] md:text-[0.6rem] font-bold">
                            {item}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <p className="lg:text-base text-sm text-[#343434] mt-1">
                    {data?.prefecture}
                    {data?.city}
                    {data?.village}
                    {data?.building}
                  </p>
                  <div className="w-full py-4 aspect-square">
                    <iframe
                      title="Google Map"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps?q=${data?.prefecture}${data?.city}${data?.village}${data?.building}&output=embed`}
                    ></iframe>
                  </div>
                  <p className="lg:text-base text-sm text-[#343434] mt-1">
                    {data?.access_text}
                  </p>
                  <Link
                    to={`https://www.google.com/maps?q=${encodeURIComponent(
                      `${data?.prefecture}${data?.city}${data?.village}${data?.building}`
                    )}`}
                    target="_blank"
                    className="lg:text-base text-sm text-[#FF2A3B] hover:underline mt-1 border-[1px] border-[#FF2A3B] py-1 px-2 rounded-lg"
                  >
                    Google Mapsで見る
                  </Link>
                </div>
              </div>

              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  設立年月
                </p>
                <p className="lg:text-base text-sm text-[#343434] w-4/5">
                  {data?.establishment_date.split("-")[0]}年
                  {data?.establishment_date.split("-")[1]}月
                </p>
              </div>

              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  施設
                </p>
                <div className="flex flex-col items-start justify-start w-4/5">
                  <Link
                    to={`/${Facilities[data?.facility_genre]}`}
                    className="lg:text-base text-sm text-[#FF2A3B] hover:underline"
                  >
                    {data?.facility_genre}
                  </Link>
                </div>
              </div>

              <div className="flex items-start justify-start border-b-[1px] py-6 border-[#e7e7e7]">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  営業時間
                </p>
                <p className="lg:text-base text-sm text-[#343434] w-4/5">
                  <pre>{data?.service_time}</pre>
                </p>
              </div>

              <div className="flex items-start justify-start py-6">
                <p className="lg:text-base text-sm font-bold text-[#343434] w-1/5">
                  休日
                </p>
                <p className="lg:text-base text-sm text-[#343434] w-4/5">
                  <pre>{data?.rest_day}</pre>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FacilityPreview;
