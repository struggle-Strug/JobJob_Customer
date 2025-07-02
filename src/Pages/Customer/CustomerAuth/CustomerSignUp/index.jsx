import { Input, message } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoLink } from "react-icons/go";
import axios from "axios";

const CustomerSignUp = () => {
  const [companyName, setCompanyName] = useState("");
  const [huriganaCompanyName, setHuriganaCompanyName] = useState("");
  const [contactPersonSei, setContactPersonSei] = useState("");
  const [contactPersonMei, setContactPersonMei] = useState("");
  const [huriganaContactPersonSei, setHuriganaContactPersonSei] = useState("");
  const [huriganaContactPersonMei, setHuriganaContactPersonMei] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (companyName === "") return message.error("法人名を入力してください。");
    if (contactPersonSei === "" || contactPersonMei === "")
      return message.error("担当者氏名を入力してください。");
    if (phoneNumber === "")
      return message.error("電話番号を入力してください。");
    if (email === "")
      return message.error("メールアドレスを入力してください。");
    if (email.includes("@") === false)
      return message.error("メールアドレスの形式が正しくありません。");

    const newCustomer = {
      companyName: companyName,
      huriganaCompanyName: huriganaCompanyName,
      contactPerson: `${contactPersonSei} ${contactPersonMei}`,
      huriganaContactPerson: `${huriganaContactPersonSei} ${huriganaContactPersonMei}`,
      phoneNumber: phoneNumber,
      email: email,
    };

    await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/v1/photo`, {
      companyName: companyName,
    });

    const resData = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/customers/signup`,
      newCustomer
    );
    if (resData.data.error) return message.error(resData.data.message);
    if (resData.data.isAuthError) return;
    message.success(
      "パスワードのご案内メールを送信しました。メールボックスをご確認ください。"
    );
    navigate("/customers/sign_in");
  };

  useEffect(() => {
    document.title = "求人掲載のお申し込み | JobJob";
    //window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="pt-16 pb-8 bg-[#F8F8F8] h-full">
      <div className="max-w-[1000px] mx-auto bg-white shadow-lg">
        <div className="p-6 border-b-[1px] border-[#EFEFEF]">
          <h1 className="lg:text-xl md:text-lg text-base font-bold text-[#343434]">
            求人掲載のお申し込み
          </h1>
        </div>
        <div className="text-center mt-4">
          <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434]">
            求人の掲載をご検討いただきありがとうございます。
          </p>
          <p className="lg:text-base md:text-sn text-xs text-[#343434] mt-4">
            ジョブジョブは求人掲載から採用まで完全無料でご利用いただけます。
          </p>
          <p className="lg:text-base md:text-sn text-xs text-[#343434]">
            掲載期間も無制限となっておりますので、じっくりと最適な人材を探すことができますので、
            <br />
            ぜひ御社の採用活動にお役立てください。
          </p>
          <p className="lg:text-base md:text-sn text-xs text-[#343434] mt-4">
            ご利用の流れは以下をご覧ください。
          </p>
        </div>
        <div className="flex items-center justify-between gap-6 w-full py-4 px-6 mt-4">
          <div className="flex flex-col items-start bg-[#F8F8F8] shadow-xl rounded-lg p-6 flex-1 h-40">
            <p className="lg:text-lg md:text-base text-sm font-bold text-[#FF6B56] text-left number">
              1.
            </p>
            <p className="lg:text-base md:text-sm text-xs mt-4">
              お申し込みフォームに
              <br />
              必要事項を記入
            </p>
          </div>
          <img
            src="/assets/images/companytop/Polygon_1.png"
            alt="triangle"
            className="mx-[-2rem]"
          />
          <div className="flex flex-col items-start shadow-xl rounded-lg p-6 flex-1 bg-[#F8F8F8] h-40">
            <p className="lg:text-lg md:text-base text-sm font-bold text-[#FF6B56] text-left number">
              2.
            </p>
            <p className="lg:text-base md:text-sm text-xs mt-4">
              アカウントの発行
            </p>
          </div>
          <img
            src="/assets/images/companytop/Polygon_1.png"
            alt="triangle"
            className="mx-[-2rem]"
          />
          <div className="flex flex-col items-start shadow-xl rounded-lg p-6 flex-1 bg-[#F8F8F8] h-40">
            <p className="lg:text-lg md:text-base text-sm font-bold text-[#FF6B56] number">
              3.
            </p>
            <p className="lg:text-base md:text-sm text-xs mt-4">ご利用開始</p>
          </div>
        </div>
        <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434] text-left px-6 mt-4">
          お申し込みフォーム
        </p>
        <div className="px-6 w-full">
          <div className="border-b-[1px] border-[#EFEFEF]">
            <div className="flex w-full border-t-[1px] border-[#EFEFEF] mt-4">
              <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-center">
                <p className="text-sm font-bold text-[#343434]">
                  <span className="bg-red-600 text-white rounded-sm px-1 text-xs mr-1">
                    必須
                  </span>
                  法人名・貴社名
                </p>
              </div>
              <div className="w-3/4 p-4">
                <Input
                  placeholder="株式会社ジョブジョブ"
                  className="w-full h-10"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
              <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-center">
                <p className="text-sm font-bold text-[#343434]">
                  法人名・貴社名(フリガナ)
                </p>
              </div>
              <div className="w-3/4 p-4">
                <Input
                  placeholder="カブシキカイシャジョブジョブ"
                  className="w-full h-10"
                  value={huriganaCompanyName}
                  onChange={(e) => setHuriganaCompanyName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
              <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-start">
                <p className="text-sm font-bold text-[#343434]">
                  <span className="bg-red-600 text-white rounded-sm px-1 text-xs mr-1">
                    必須
                  </span>
                  担当者氏名
                </p>
              </div>
              <div className="w-3/4 p-4">
                <p className="lg:text-sm text-xs text-red-600">
                  ※ジョブジョブ運営事務局および応募者との連絡先となります。応募者に開示可能な連絡先をご入力ください。求人原稿には掲載されません。
                </p>
                <div className="w-full flex items-center gap-6 mt-4">
                  <Input
                    placeholder="山田"
                    className="w-1/2 h-10"
                    value={contactPersonSei}
                    onChange={(e) => setContactPersonSei(e.target.value)}
                  />
                  <Input
                    placeholder="太郎"
                    className="w-1/2 h-10"
                    value={contactPersonMei}
                    onChange={(e) => setContactPersonMei(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
              <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-center">
                <p className="text-sm font-bold text-[#343434]">
                  担当者氏名(フリガナ)
                </p>
              </div>
              <div className="w-3/4 p-4 flex items-center gap-6">
                <Input
                  placeholder="ヤマダ"
                  className="w-1/2 h-10"
                  value={huriganaContactPersonSei}
                  onChange={(e) => setHuriganaContactPersonSei(e.target.value)}
                />
                <Input
                  placeholder="タロウ"
                  className="w-1/2 h-10"
                  value={huriganaContactPersonMei}
                  onChange={(e) => setHuriganaContactPersonMei(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
              <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-center">
                <p className="text-sm font-bold text-[#343434]">
                  <span className="bg-red-600 text-white rounded-sm px-1 text-xs mr-1">
                    必須
                  </span>
                  電話番号
                </p>
              </div>
              <div className="w-3/4 p-4 flex flex-col items-start">
                <p className="text-xs text-red-600 lg:text-sm ">
                  ※ジョブジョブ運営事務局および応募者との連絡先となります。応募者に開示可能な連絡先をご入力ください。求人原稿には掲載されません。
                </p>
                <Input
                  placeholder="03-1234-5678"
                  className="w-full h-10 mt-4"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
              <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-center">
                <p className="text-sm font-bold text-[#343434]">
                  <span className="bg-red-600 text-white rounded-sm px-1 text-xs mr-1">
                    必須
                  </span>
                  メールアドレス
                </p>
              </div>
              <div className="w-3/4 p-4">
                <Input
                  placeholder="jobjob@example.com"
                  className="w-full h-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-8 py-4">
          <button
            className="bg-red-600 hover:bg-red-200 text-white hover:text-red-500 rounded-sm lg:text-lg md:text-base text-sm lg:px-12 md:px-8 px-4 py-2 duration-300"
            onClick={handleSubmit}
          >
            利用規約に同意して申し込む
          </button>
        </div>
        <div className="flex items-center justify-center gap-4 px-8 pb-4">
          <Link
            to={"/customers/rule"}
            target="_blank"
            className="lg:text-base md:text-sm text-xs text-blue-500 flex items-center gap-1 hover:underline"
          >
            利用規約はこちら
            <GoLink className="text-blue-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignUp;
