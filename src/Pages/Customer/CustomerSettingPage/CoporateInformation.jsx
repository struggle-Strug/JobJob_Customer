"use client";

import { useState } from "react";
import { Row, Col, Input, Select } from "antd";
import { toast } from "react-hot-toast";

import { Link } from "react-router-dom";
import { Prefectures } from "../../../utils/constants/categories/prefectures.js";
import { Municipalities } from "../../../utils/constants/categories/municipalities.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import axios from "axios";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const { Option, OptGroup } = Select;

// スタイルオブジェクトの定義
const inputStyle = {
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
};

const selectStyle = {
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
};

const cellStyle = {
  border: "0.5px solid #c5c5c5",
  padding: 1,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  paddingLeft: 2,
};

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

const CoporateInformation = () => {
  const { customerUser } = useAuth();
  // 各入力項目用の state 変数の定義
  const [customer, setCustomer] = useState({});
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [postalCode, setPostalCode] = useState(""); // 郵便番号
  const [prefecture, setPrefecture] = useState(""); // 都道府県
  const [municipality, setMunicipality] = useState(""); // 市区町村
  const [address, setAddress] = useState(""); // 町名・番地
  const [buildingName, setBuildingName] = useState(""); // 建物名
  const [firstName, setFirstName] = useState(""); // 担当者氏名（名）
  const [lastName, setLastName] = useState(""); // 担当者氏名（姓）
  const [firstNameFurigana, setFirstNameFurigana] = useState(""); // 担当者氏名(フリガナ)（名）
  const [lastNameFurigana, setLastNameFurigana] = useState(""); // 担当者氏名(フリガナ)（姓）
  const [phoneNumber, setPhoneNumber] = useState(""); // 電話番号

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
      if(response.data.error) return toast.error(response.data.message)
      setCustomer(response.data.customer)
      setFirstName(response.data.customer.contactPerson.split(" ")[0]);
      setLastName(response.data.customer.contactPerson.split(" ")[1]);
      setFirstNameFurigana(
        response.data.customer.huriganaContactPerson.split(" ")[0]
      );
      setLastNameFurigana(
        response.data.customer.huriganaContactPerson.split(" ")[1]
      );
      setPhoneNumber(response.data.customer.phoneNumber);
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
    if (postalCode === "") error.push("郵便番号");
    if (prefecture === "") error.push("都道府県");
    if (municipality === "") error.push("市区町村");
    if (address === "") error.push("町名・番地");
    if (firstName === "" || lastName === "") error.push("担当者氏名");
    if (phoneNumber === "") error.push("電話番号");

    if (error.length > 0)
      return toast.error(error.join(", ") + "を入力してください。");

    const companyData = {
      customer_id: customerUser?.customerId,
      companyName: customerUser?.companyName,
      postalCode: postalCode,
      prefecture: prefecture,
      municipality: municipality,
      address: address,
      buildingName: buildingName,
      contactPerson: `${firstName} ${lastName}`, // Correct way to concatenate variables
      contactPersonHurigana: `${firstNameFurigana} ${lastNameFurigana}`,
      phoneNumber: phoneNumber,
    };

    try {
      let response;

      if (alreadyRegistered) {
        response = await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/v1/company`,
          companyData
        );
        if (response.data.error) return toast.error(response.data.message);
        if (response.data.isAuthError) return;
        toast.success("法人情報を更新しました。");
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/v1/company`,
          companyData
        );
        if (response.data.error) return toast.error(response.data.message);
        if (response.data.isAuthError) return;
        toast.success("法人情報を登録しました。");
        setAlreadyRegistered(true);
      }
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
        setAlreadyRegistered(true);
        setPostalCode(response.data.company.postalCode);
        setPrefecture(response.data.company.prefecture);
        setMunicipality(response.data.company.municipality);
        setAddress(response.data.company.address);
        setBuildingName(response.data.company.buildingName);
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
  }, []);

  useEffect(() => {
    if(!alreadyRegistered) getCustomer()
  }, [alreadyRegistered]);
  return (
    <>
      <Helmet>
        <title>法人情報 | JobJob (ジョブジョブ)</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <form onSubmit={handleSubmit}>
        <Row className="bg-[#ffffff] rounded-lg p-3 ">
          {/* セクションタイトル */}
          <Col span={24} className="font-black text-lg ">
            法人情報
          </Col>

          <Col span={24} className="p-6">
            {/* 法人名・貴社名表示 */}
            <Row>
              <Col span={5} className="font-bold">
                法人名・貴社名
              </Col>
              <Col span={19}>
                <p className="pl-3 pr-3 pb-3">{customer?.companyName}</p>
                <p className="p-3">
                  ※法人名・貴社名を変更する場合は、
                  <Link
                    to="/customers/contact"
                    style={{
                      textDecoration: "underline",
                      color: "-webkit-link",
                    }}
                  >
                    お問い合わせ
                  </Link>
                  ください
                </p>
              </Col>
            </Row>

            {/* 住所入力エリア */}
            <Row className="mt-6">
              {/* 郵便番号 */}
              <Col span={7} className="bg-[#f5f5f5] p-3" style={formCellStyle}>
                <p>
                  <span className="bg-[red] text-[white] font-bold p-[2px] pt-[0.5px] pb-[0.5px] rounded-sm mr-3">
                    必須
                  </span>
                  <span className="font-bold">郵便番号</span>
                </p>
              </Col>
              <Col
                span={17}
                className="p-3"
                style={{ ...formCellStyle, borderLeft: "none" }}
              >
                <Input
                  placeholder="郵便番号"
                  value={postalCode}
                  onChange={(e) =>
                    handleNumericInput(
                      e.target.value,
                      setPostalCode,
                      "郵便番号"
                    )
                  }
                />
              </Col>

              {/* 都道府県 */}
              <Col
                span={7}
                className="bg-[#f5f5f5] p-3"
                style={formCellStyleNoTop}
              >
                <p>
                  <span className="bg-[red] text-[white] font-bold p-[2px] pt-[0.5px] pb-[0.5px] rounded-sm mr-3">
                    必須
                  </span>
                  <span className="font-bold">都道府県</span>
                </p>
              </Col>
              <Col span={17} className="p-3" style={formCellStyleNoTopNoLeft}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="都道府県"
                  value={prefecture || undefined}
                  onChange={(value) => {
                    setPrefecture(value);
                    setMunicipality(""); // 都道府県が変更されたら市区町村をリセット
                  }}
                >
                  {Object.keys(Prefectures).map((region) => (
                    <OptGroup label={region} key={region}>
                      {Object.keys(Prefectures[region]).map((prefName) => (
                        <Option value={prefName} key={prefName}>
                          {prefName}
                        </Option>
                      ))}
                    </OptGroup>
                  ))}
                </Select>
              </Col>

              {/* 市区町村 */}
              <Col
                span={7}
                className="bg-[#f5f5f5] p-3"
                style={formCellStyleNoTop}
              >
                <p>
                  <span className="bg-[red] text-[white] font-bold p-[2px] pt-[0.5px] pb-[0.5px] rounded-sm mr-3">
                    必須
                  </span>
                  <span className="font-bold">市区町村</span>
                </p>
              </Col>
              <Col span={17} className="p-3" style={formCellStyleNoTopNoLeft}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="市区町村"
                  value={municipality || undefined}
                  onChange={(value) => setMunicipality(value)}
                  disabled={!prefecture} // 都道府県未選択時は無効にする
                >
                  {prefecture &&
                    Municipalities[prefecture] &&
                    Municipalities[prefecture].map((city) => (
                      <Option value={city} key={city}>
                        {city}
                      </Option>
                    ))}
                </Select>
              </Col>

              {/* 町名・番地 */}
              <Col
                span={7}
                className="bg-[#f5f5f5] p-3"
                style={formCellStyleNoTop}
              >
                <p>
                  <span className="bg-[red] text-[white] font-bold p-[2px] pt-[0.5px] pb-[0.5px] rounded-sm mr-3">
                    必須
                  </span>
                  <span className="font-bold">町名・番地</span>
                </p>
              </Col>
              <Col span={17} className="p-3" style={formCellStyleNoTopNoLeft}>
                <Input
                  placeholder="町名・番地"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Col>

              {/* 建物名 */}
              <Col
                span={7}
                className="bg-[#f5f5f5] p-3"
                style={formCellStyleNoTop}
              >
                <p>
                  <span className="font-bold">建物名</span>
                </p>
              </Col>
              <Col span={17} className="p-3" style={formCellStyleNoTopNoLeft}>
                <Input
                  placeholder="建物名"
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                />
              </Col>
            </Row>

            {/* 担当者情報入力エリア */}
            <Row className="mt-6">
              {/* 担当者氏名 */}
              <Col span={7} className="bg-[#f5f5f5] p-3" style={formCellStyle}>
                <p>
                  <span className="bg-[red] text-[white] font-bold p-[2px] pt-[0.5px] pb-[0.5px] rounded-sm mr-3">
                    必須
                  </span>
                  <span className="font-bold">担当者氏名</span>
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

              {/* 担当者氏名(フリガナ) */}
              <Col
                span={7}
                className="bg-[#f5f5f5] p-3"
                style={formCellStyleNoTop}
              >
                <p>
                  <span className="font-bold">担当者氏名(フリガナ)</span>
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
                  <span className="bg-[red] text-[white] font-bold p-[2px] pt-[0.5px] pb-[0.5px] rounded-sm mr-3">
                    必須
                  </span>
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
            </Row>

            {/* 送信ボタン */}
            <div className="flex items-center justify-center m-8">
              <button
                type="submit"
                className="inline-block px-4 py-2 font-bold text-blue-600 bg-blue-100 rounded-lg border relative"
                style={{ border: "2px solid #aaaaaa" }}
              >
                上記の内容で情報を保存する
              </button>
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default CoporateInformation;
