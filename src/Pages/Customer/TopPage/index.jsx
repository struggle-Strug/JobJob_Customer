import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const CLTop = () => {
  return (
    <>
      <Helmet>
        <title>採用管理トップ | JobJob (ジョブジョブ)</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="w-full min-h-screen">
        <div className="flex flex-col items-start justify-start gap-4 w-full bg-white rounded-lg py-4 px-8 shadow-xl">
          <div className="flex flex-col items-start justify-start gap-2 border-b-[1px] border-[#e7e7e7] py-3">
            <p className="lg:text-xl md:text-lg text-base font-bold text-[#343434]">
              カンタン3ステップで採用！（無料）
            </p>
            <img
              src="/assets/images/CLTop/カンタン3ステップ.jpg"
              alt="カンタン3ステップ"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2 border-b-[1px] border-[#e7e7e7] py-3">
            <Link
              to={"/customers/banner"}
              className="lg:text-xl md:text-lg text-base font-bold text-[#5d9eff] cursor-pointer hover:scale-105 duration-300"
            >
              リンク掲載のお願い
            </Link>
            <p className="lg:text-base md:text-sm text-xs text-[#343434]">
              ジョブジョブでは、求人情報がよりたくさんの人の目に触れてほしいという思いから、皆さまへリンク掲載をお願いしています。医院や施設のホームページ・個人のブログなど問いませんので、是非ご協力ください
            </p>
          </div>
          <div className="flex items-start justify-start gap-4 border-b-[1px] border-[#e7e7e7] w-full py-3">
            <Link
              to={"/customers/contact"}
              className="lg:text-base md:text-sm text-xs text-[#5d9eff] hover:underline hover:text-[#ff5a5f] duration-300"
            >
              お問い合わせ
            </Link>
            <Link
              to={"/customers/rule"}
              className="lg:text-base md:text-sm text-xs text-[#5d9eff] hover:underline hover:text-[#ff5a5f] duration-300"
            >
              利用規約
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CLTop;
