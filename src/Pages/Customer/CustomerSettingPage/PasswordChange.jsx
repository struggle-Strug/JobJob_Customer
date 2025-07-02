import { Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const PasswordChange = () => {
  const { customer, customerUser } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handlePassword = async () => {
    if (newPassword !== confirmPassword) {
      message.error("新しいパスワードと確認用パスワードが一致しません");
      return;
    }
    const resData = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/customers/password/${customerUser?._id}`,
      { currentPassword: currentPassword, newPassword: newPassword }
    );
    if (resData.data.error || resData.data.isAuthError) {
      message.error(resData.data.message);
    } else {
      message.success(resData.data.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>パスワード | JobJob (ジョブジョブ)</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="bg-white min-h-screen p-8 rounded-lg">
        <div
          className={`duration-300 w-3/4 overflow-hidden bg-[#f7f6f2] rounded-lg p-8`}
        >
          <p className="lg:text-sm text-xs text-[#343434] font-medium">
            現在のパスワード
          </p>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="h-10 mt-2"
          />
          <p className="lg:text-sm text-xs text-[#343434] font-medium mt-2">
            新しいパスワード
          </p>
          <Input
            type="password"
            value={newPassword}
            placeholder="8文字以上"
            onChange={(e) => setNewPassword(e.target.value)}
            className="h-10 mt-2"
          />
          <p className="lg:text-sm text-xs text-[#343434] font-medium mt-2">
            新しいパスワード(確認)
          </p>
          <Input
            type="password"
            value={confirmPassword}
            placeholder="8文字以上"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-10 mt-2"
          />
          <div className="w-full flex justify-center items-center mt-4">
            <button
              onClick={handlePassword}
              className="lg:text-base md:text-sm text-xs bg-[#e22434] text-white rounded-lg px-4 py-3 hover:bg-[#ffe4e4] hover:text-red-500 duration-300"
            >
              パスワードを変更する
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordChange;
