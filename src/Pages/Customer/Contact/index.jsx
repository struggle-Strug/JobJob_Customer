"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { Row, Col, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

import { useAuth } from "../../../context/AuthContext.jsx";

// スタイルオブジェクトの定義
const formCellStyle = {
  border: "0.5px solid #c5c5c5",
};

const formCellStyleNoTop = {
  borderLeft: "0.5px solid #c5c5c5",
  borderRight: "0.5px solid #c5c5c5",
  borderBottom: "0.5px solid #c5c5c5",
};

const formCellStyleNoTopNoLeft = {
  borderRight: "0.5px solid #c5c5c5",
  borderBottom: "0.5px solid #c5c5c5",
};

const Contact = () => {
  const { customerUser } = useAuth();
  // 各入力項目用の state 変数の定義
  const [firstName, setFirstName] = useState(""); // 担当者氏名（名）
  const [lastName, setLastName] = useState(""); // 担当者氏名（姓）
  const [firstNameFurigana, setFirstNameFurigana] = useState(""); // 担当者氏名(フリガナ)（名）
  const [lastNameFurigana, setLastNameFurigana] = useState(""); // 担当者氏名(フリガナ)（姓）
  const [phoneNumber, setPhoneNumber] = useState(""); // 電話番号
  const [email, setEmail] = useState(""); // メールアドレス
  const [body, setBody] = useState(""); // お問い合わせ内容
  const navigate = useNavigate();

  // 数字のみの入力を許容するハンドラ
  const handleNumericInput = (value, setter, fieldName) => {
    if (/^\d*$/.test(value)) {
      setter(value);
    } else {
      toast.error(`${fieldName}は数字のみ入力してください`);
    }
  };

  const getCustomer = async() => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/customers/${customerUser?.customerId}`
      );
      if(response.data.error) return toast.error(response.data.message);
      setEmail(response.data.customer.email);
    } catch (error) {
      if (error.status != 401) {
        console.error(error);
        toast.error("エラーが発生しました");
      }
    }
  }

  // 送信ボタン押下時のハンドラ
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = [];
    if (firstName === "" || lastName === "") error.push("氏名");
    if (firstNameFurigana === "" || lastNameFurigana === "") error.push("氏名(フリガナ)");
    if (email === "") error.push("メールアドレス");
    if (body === "") error.push("お問い合わせ内容");
    if (error.length > 0)
      return toast.error(error.join(", ") + "を入力してください。");

    if (email.includes("@") === false)
      return toast.error("メールアドレスの形式が正しくありません。");

    const inquiryData = {
      contactPerson: `${lastName} ${firstName}`,
      contactPersonHurigana: `${lastNameFurigana} ${firstNameFurigana}`,
      phoneNumber: phoneNumber,
      email: email,
      body: body,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/customers/contact`,
        inquiryData
      );
      if (response.data.error) return toast.error(response.data.message);
      if (response.data.isAuthError) return;
      toast.success("お問い合わせありがとうございました。\n返信までしばらくお待ちください。");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("エラーが発生しました。");
    }
  };

  const getCompanyInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/company/`
      );
      if (response.data.error || response.data.isAuthError) {
        if (response.data.isAuthError) return;
      } else {
        setFirstName(response.data.company.contactPerson.split(" ")[0]);
        setLastName(response.data.company.contactPerson.split(" ")[1]);
        setFirstNameFurigana(
          response.data.company.contactPersonHurigana.split(" ")[0]
        );
        setLastNameFurigana(
          response.data.company.contactPersonHurigana.split(" ")[1]
        );
        setPhoneNumber(response.data.company.phoneNumber);
      }

    } catch (error) {
      if (error.status != 401) {
        console.error(error);
        toast.error("エラーが発生しました");
      }
    }
  };

  useEffect(() => {
    getCompanyInfo();
    getCustomer();
  }, []);
  return (
    <>
      <Helmet>
        <title>お問い合わせフォーム | JobJob (ジョブジョブ)</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="pt-16 pb-8 bg-[#F8F8F8] h-full">
        <div className="max-w-[1000px] mx-auto bg-white shadow-lg p-10">
          <div className="p-3 border-b-[1px] border-[#EFEFEF]">
            <h1 className="lg:text-xl md:text-lg text-base font-bold text-[#343434]">
              お問い合わせフォーム
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <Row className="bg-[#ffffff] rounded-lg p-3 ">

              <Col span={24} className="">

                <Row className="">
                  {/* 氏名 */}
                  <Col span={7} className="bg-[#f5f5f5] p-3" style={formCellStyle}>
                    <p>
                      <span className="bg-[red] text-[white] font-bold p-[2px] pt-[0.5px] pb-[0.5px] rounded-sm mr-3">
                        必須
                      </span>
                      <span className="font-bold">氏名</span>
                    </p>
                  </Col>
                  <Col
                    span={17}
                    className="p-3"
                    style={{ ...formCellStyle, borderLeft: "none" }}
                  >
                    <Row className="gap-2">
                      <Col span={10}>
                        <Input
                          placeholder="山田"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Col>
                      <Col span={10}>
                        <Input
                          placeholder="太郎"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </Col>

                  {/* 氏名(フリガナ) */}
                  <Col
                    span={7}
                    className="bg-[#f5f5f5] p-3"
                    style={formCellStyleNoTop}
                  >
                    <p>
                      <span className="bg-[red] text-[white] font-bold p-[2px] pt-[0.5px] pb-[0.5px] rounded-sm mr-3">
                        必須
                      </span>
                      <span className="font-bold">氏名(フリガナ)</span>
                    </p>
                  </Col>
                  <Col span={17} className="p-3" style={formCellStyleNoTopNoLeft}>
                    <Row className="gap-2">
                      <Col span={10}>
                        <Input
                          placeholder="ヤマダ"
                          value={lastNameFurigana}
                          onChange={(e) => setLastNameFurigana(e.target.value)}
                        />
                      </Col>
                      <Col span={10}>
                        <Input
                          placeholder="タロウ"
                          value={firstNameFurigana}
                          onChange={(e) => setFirstNameFurigana(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </Col>

                  {/* 電話番号 */}
                  <Col
                    span={7}
                    className="bg-[#f5f5f5] p-3"
                    style={formCellStyleNoTop}
                  >
                    <p>
                      <span className="font-bold">電話番号</span>
                    </p>
                  </Col>
                  <Col span={17} className="p-3" style={formCellStyleNoTopNoLeft}>
                    <Input
                      placeholder="0123456789"
                      value={phoneNumber}
                      onChange={(e) =>
                        handleNumericInput(
                          e.target.value,
                          setPhoneNumber,
                          "電話番号"
                        )
                      }
                    />
                  </Col>

                  {/* メールアドレス */}
                  <Col
                    span={7}
                    className="bg-[#f5f5f5] p-3"
                    style={formCellStyleNoTop}
                  >
                    <p>
                      <span className="bg-[red] text-[white] font-bold p-[2px] pt-[0.5px] pb-[0.5px] rounded-sm mr-3">
                        必須
                      </span>
                      <span className="font-bold">メールアドレス</span>
                    </p>
                  </Col>
                  <Col span={17} className="p-3" style={formCellStyleNoTopNoLeft}>
                    <Input
                      placeholder="jobjob@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>

                  {/* お問い合わせ内容 */}
                  <Col
                    span={7}
                    className="bg-[#f5f5f5] p-3"
                    style={formCellStyleNoTop}
                  >
                    <p>
                      <span className="bg-[red] text-[white] font-bold p-[2px] pt-[0.5px] pb-[0.5px] rounded-sm mr-3">
                        必須
                      </span>
                      <span className="font-bold">お問い合わせ内容</span>
                    </p>
                  </Col>
                  <Col span={17} className="p-3 textarea" style={formCellStyleNoTopNoLeft}>
                    <TextArea
                      placeholder=""
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </Col>
                </Row>

                {/* 送信ボタン */}
                <div className="flex items-center justify-center m-8">
                  <button
                    type="submit"
                    className="inline-block px-4 py-2 font-bold text-blue-600 bg-blue-100 hover:text-red-600 rounded-lg border relative"
                    style={{ border: "2px solid #aaaaaa" }}
                  >
                    利用規約に同意して問い合わせる
                  </button>
                  <Link
                    to={"/customers/rule"}
                    target="_blank"
                    className="text-blue-600 text-sm hover:text-red-600 duration-200 p-3"
                  >
                    利用規約はこちら
                  </Link>
                </div>
              </Col>

            </Row>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
