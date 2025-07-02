import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

const CustomerSetting = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/customers/sign_in");
  };
  return (
    <>
      <Helmet>
        <title>設定 | JobJob (ジョブジョブ)</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="w-full min-h-screen">
        <div className="flex flex-col w-full bg-white rounded-lg shadow-xl min-h-screen">
          <p className="text-left text-xl font-bold text-[#343434] p-4">設定</p>
          <div className="flex flex-col px-8">
            <p className="text-left text-base font-bold text-[#343434] p-4">
              個人設定
            </p>
            <div className="flex justify-start px-8 gap-4">
              <Link
                to={"/customers/settings/mail"}
                className="text-sm text-[#343434] hover:text-[#FF2A3B] hover:underline duration-300"
              >
                メールアドレス変更
              </Link>
              <Link
                to={"/customers/settings/pass"}
                className="text-sm text-[#343434] hover:text-[#FF2A3B] hover:underline duration-300"
              >
                パスワード変更
              </Link>
            </div>
          </div>
          <div className="flex flex-col px-8 mt-8">
            <p className="text-left text-base font-bold text-[#343434] p-4">
              法人設定
            </p>
            <div className="flex justify-start px-8 gap-4">
              <Link
                to={"/customers/settings/corporate"}
                className="text-sm text-[#343434] hover:text-[#FF2A3B] hover:underline duration-300"
              >
                法人情報
              </Link>
              <Link
                to={"/customers/settings/user"}
                className="text-sm text-[#343434] hover:text-[#FF2A3B] hover:underline duration-300"
              >
                ユーザー管理
              </Link>
            </div>
          </div>
          <div className="flex flex-col px-8 mt-8">
            <button
              className="text-left text-base font-bold text-[#343434] p-4 hover:text-[#FF2A3B] hover:underline duration-300"
              onClick={handleLogout}
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerSetting;
