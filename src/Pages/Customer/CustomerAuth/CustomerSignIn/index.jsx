import { Input, message } from "antd";
import { useLocation } from "react-router-dom";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext.jsx";

const CustomerSignIn = () => {
  const { setCustomer, setCustomerUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const token = queryParams.get("token");

  const handleSubmit = async (e) => {
    if (email === "") return toast.error("メールアドレスを入力してください。");
    if (password === "") return toast.error("パスワードを入力してください。");
    e.preventDefault();
    const signInData = {
      email: email,
      password: password,
    };
    const resData = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/customers/signin`,
      signInData
    );
    if (resData.data.error)
      return toast.error("メールアドレスまたはパスワードが間違えています 。");
    localStorage.setItem("token", resData.data.token);
    toast.success(resData.data.message);
    setCustomer(resData.data.customer);
    setCustomerUser(resData.data.user);
    navigate("/customers");
  };

  useEffect(() => {
    document.title = "採用管理画面ログイン | JobJob";
    if (token) {
      localStorage.setItem("token", token);
      navigate("/customers");
    }
    //window.scrollTo({ top: 0, behavior: "smooth" });
  }, [token]);
  return (
    <div className="pt-16 pb-8 bg-[#F8F8F8] min-h-screen">
      <div className="max-w-[700px] mx-auto bg-white shadow-lg p-4">
        <div className="text-center mt-4">
          <h1 className="lg:text-xl md:text-lg text-base font-bold text-[#343434] pt-4">
            採用管理画面ログイン
          </h1>
        </div>
        <div className="flex items-center justify-center gap-4 px-8 mt-8">
          <p className="w-1/4 lg:text-base md:text-sm text-xs text-[#343434] text-center">
            メールアドレス
          </p>
          <Input
            className="w-3/4 h-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center gap-4 px-8 mt-8">
          <p className="w-1/4 lg:text-base md:text-sm text-xs text-[#343434] text-center">
            パスワード
          </p>
          <Input
            className="w-3/4 h-10"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center px-8 py-4 mt-4">
          <button
            className="bg-red-600 hover:bg-red-200 text-white hover:text-red-500 rounded-sm lg:text-lg md:text-base text-sm lg:px-12 md:px-8 px-4 py-2 duration-300"
            onClick={handleSubmit}
          >
            ログイン
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="lg:text-base md:text-sm text-xs text-[#343434] pt-4">
            パスワードがわからない場合やログインができない場合は、
          </p>
          <p className="lg:text-base md:text-sm text-xs text-[#343434]">
            support@jobjob-jp.com までお問い合わせください。
          </p>
        </div>
      </div>
      <div className="max-w-[700px] mx-auto bg-white shadow-lg mt-8 p-4">
        <div className="text-center mt-4">
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            まだご利用を開始されていない医院・事業所様はこちら
          </h1>
        </div>
        <div className="flex items-center justify-center px-8 py-4">
          <Link
            to={"/customers/new"}
            className="bg-blue-600 hover:bg-blue-200 text-white hover:text-blue-500 rounded-sm lg:text-lg md:text-base text-sm lg:px-12 md:px-8 px-4 py-2 duration-300"
          >
            求人掲載のお申し込み
          </Link>
        </div>
        <div className="text-center mt-4">
          <h1 className="lg:text-lg md:text-base text-sm font-bold text-[#343434] pt-4">
            お仕事をお探しの方はこちら
          </h1>
        </div>
        <div className="flex items-center justify-center px-8 py-4">
          <Link
            to={"/members/sign_in"}
            className="bg-blue-600 hover:bg-blue-200 text-white hover:text-blue-500 rounded-sm lg:text-lg md:text-base text-sm lg:px-12 md:px-8 px-4 py-2 duration-300"
          >
            求職者ログイン
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignIn;
