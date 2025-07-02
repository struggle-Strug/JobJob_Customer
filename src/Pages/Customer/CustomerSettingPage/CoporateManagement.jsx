import axios from "axios";
import { Button, Input, message, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { Helmet } from "react-helmet";

const CoporateManagement = () => {
  const { customer } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [addUserModal, setAddUserModal] = useState(false);
  const [contactPersonSei, setContactPersonSei] = useState("");
  const [contactPersonMei, setContactPersonMei] = useState("");
  const [huriganaContactPersonSei, setHuriganaContactPersonSei] = useState("");
  const [huriganaContactPersonMei, setHuriganaContactPersonMei] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Table columns
  const columns = [
    {
      title: "メールアドレス",
      dataIndex: "email",
      key: "email",
      width: 600,
    },
    {
      title: "氏名",
      dataIndex: "contactPerson",
      key: "contactPerson",
      width: 600,
    },
    {
      title: "操作",
      key: "actions",
      align: "center", // Center-align the column title and content
      render: (_, record) => (
        <div className="flex justify-center">
          {" "}
          {/* Center the button in the cell */}
          <Button
            className="text-white text-sm bg-[#FF2A3B] px-4 py-2 rounded-lg"
            disabled={data?.length === 1 || record.email === customer.email}
            onClick={() => handleDelete(record.id)}
          >
            削除
          </Button>
        </div>
      ),
      width: 120,
    },
  ];

  const data = users?.map((user) => ({
    key: user._id,
    id: user._id,
    email: user.email,
    contactPerson: user.contactPerson,
  }));

  const handleAdd = async () => {
    if (email === "") return message.error("メールアドレスを入力してください");
    if (password === "") return message.error("パスワードを入力してください");
    if (password !== confirmPassword)
      return message.error("パスワードが一致しません");

    const newCustomer = {
      contactPerson: `${contactPersonSei} ${contactPersonMei}`,
      huriganaContactPerson: `${huriganaContactPersonSei} ${huriganaContactPersonMei}`,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/customers/users`,
      newCustomer
    );
    if (response.data.error) return message.error(response.data.message);
    if (response.data.isAuthError) return;
    message.success("ユーザー追加完了");
    setAddUserModal(false);
    getUsers();
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/customers/users/${id}`
    );
    if (response.data.error) return message.error(response.data.message);
    if (response.data.isAuthError) return;
    message.success("ユーザー削除完了");
    getUsers();
  };

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/customers/users`
      );
      if (response.data.error) return message.error(response.data.message);
      if (response.data.isAuthError) return;
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setContactPersonSei("");
    setContactPersonMei("");
    setHuriganaContactPersonSei("");
    setHuriganaContactPersonMei("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, [addUserModal]);

  useEffect(() => {
    getUsers();
    //window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <title>ユーザー管理 | JobJob (ジョブジョブ)</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="flex flex-col bg-white min-h-screen p-8 rounded-lg">
        <p className="text-left text-xl font-bold text-[#343434] p-4">
          ユーザー管理
        </p>
        <div className="flex justify-center text-[#FF2A3B]">
          <Button
            className="text-white text-base bg-[#FF2A3B] px-8 py-5 rounded-lg"
            onClick={() => {
              setAddUserModal(true);
            }}
          >
            ユーザー追加
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 20,
            position: ["bottomCenter"], // Center the pagination at the bottom
          }}
          bordered
          size="middle"
          className="[&_.ant-table-cell]:!whitespace-nowrap mt-8"
        />
      </div>

      <Modal
        open={addUserModal}
        onCancel={() => setAddUserModal(false)}
        footer={null}
        width={800}
        className="modal"
      >
        <div className="border-r-[1px] border-b-[1px] border-[#EFEFEF] m-8">
          <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
            <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-start">
              <p className="text-sm font-bold text-[#343434]">担当者氏名</p>
            </div>
            <div className="w-3/4 p-4">
              <div className="w-full flex items-center gap-6">
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
          <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
            <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-center">
              <p className="text-sm font-bold text-[#343434]">
                <span className="bg-red-600 text-white rounded-sm px-1 text-xs mr-1">
                  必須
                </span>
                パスワード
              </p>
            </div>
            <div className="w-3/4 p-4">
              <Input
                type="password"
                className="w-full h-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full border-t-[1px] border-[#EFEFEF]">
            <div className="w-1/4 p-4 bg-[#f5f5f5] flex items-center">
              <p className="text-sm font-bold text-[#343434]">
                <span className="bg-red-600 text-white rounded-sm px-1 text-xs mr-1">
                  必須
                </span>
                パスワード
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(確認)
              </p>
            </div>
            <div className="w-3/4 p-4">
              <Input
                type="password"
                className="w-full h-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="text-white text-sm bg-[#FF2A3B] px-8 py-4 rounded-lg"
            onClick={handleAdd}
          >
            登録
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CoporateManagement;
