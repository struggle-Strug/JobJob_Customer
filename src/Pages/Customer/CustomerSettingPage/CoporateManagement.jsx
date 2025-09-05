import axios from "axios";
import { Button, Input, message, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";

const CoporateManagement = () => {
  const { customerUser } = useAuth();
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

  // autofill 回避用 readOnly フラグ（フォーカス時に解除）
  const [roEmail, setRoEmail] = useState(true);
  const [roPassword, setRoPassword] = useState(true);
  const [roConfirmPassword, setRoConfirmPassword] = useState(true);

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
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center">
          <Button
            className="text-white text-sm bg-[#FF2A3B] px-4 py-2 rounded-lg"
            disabled={data?.length === 1 || record.email === customerUser.email}
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
    if (email === "") return toast.error("メールアドレスを入力してください");
    if (password === "") return toast.error("パスワードを入力してください");
    if (password !== confirmPassword)
      return toast.error("パスワードが一致しません");

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
    if (response.data.error) return toast.error(response.data.message);
    if (response.data.isAuthError) return;
    toast.success("ユーザー追加完了");
    setAddUserModal(false);
    getUsers();
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/customers/users/${id}`
    );
    if (response.data.error) return toast.error(response.data.message);
    if (response.data.isAuthError) return;
    toast.success("ユーザー削除完了");
    getUsers();
  };

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/customers/users`
      );
      if (response.data.error) return toast.error(response.data.message);
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

    // モーダルを開くたびに readOnly を true に戻す（autofill 回避）
    setRoEmail(true);
    setRoPassword(true);
    setRoConfirmPassword(true);
  }, [addUserModal]);

  useEffect(() => {
    getUsers();
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
            position: ["bottomCenter"],
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
        {/* フォーム全体のオートコンプリートOFF */}
        <form autoComplete="off">
          {/* ブラウザのオートフィルを吸うダミーフィールド */}
          <input
            type="text"
            name="username"
            autoComplete="username"
            style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
            tabIndex={-1}
            aria-hidden="true"
          />
          <input
            type="password"
            name="current-password"
            autoComplete="current-password"
            style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
            tabIndex={-1}
            aria-hidden="true"
          />

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
                    autoComplete="off"
                    name="cp_sei"
                  />
                  <Input
                    placeholder="太郎"
                    className="w-1/2 h-10"
                    value={contactPersonMei}
                    onChange={(e) => setContactPersonMei(e.target.value)}
                    autoComplete="off"
                    name="cp_mei"
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
                  // autofill 回避
                  autoComplete="off"
                  name="new-user-email"
                  inputMode="email"
                  spellCheck={false}
                  autoCapitalize="off"
                  readOnly={roEmail}
                  onFocus={(e) => {
                    if (roEmail) {
                      setRoEmail(false);
                      // フォーカス後に解除したreadOnlyが即反映されるように
                      requestAnimationFrame(() => e.target.removeAttribute("readonly"));
                    }
                  }}
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
                  // autofill 回避
                  autoComplete="new-password"
                  name="new-user-password"
                  readOnly={roPassword}
                  onFocus={(e) => {
                    if (roPassword) {
                      setRoPassword(false);
                      requestAnimationFrame(() => e.target.removeAttribute("readonly"));
                    }
                  }}
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
                  // autofill 回避
                  autoComplete="new-password"
                  name="new-user-password-confirm"
                  readOnly={roConfirmPassword}
                  onFocus={(e) => {
                    if (roConfirmPassword) {
                      setRoConfirmPassword(false);
                      requestAnimationFrame(() => e.target.removeAttribute("readonly"));
                    }
                  }}
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
        </form>
      </Modal>
    </>
  );
};

export default CoporateManagement;
