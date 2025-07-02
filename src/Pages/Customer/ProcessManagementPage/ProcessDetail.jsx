"use client";

import { message, Modal, Button, Table, Input } from "antd";
import moment from "moment";
import { useState, useCallback, useMemo } from "react";
import MemberDetailModal from "./MemberDetailModal";
import { getJobTypeValue } from "../../../utils/getFunctions";
import { JobType } from "../../../utils/constants/categories";
import axios from "axios";

const { TextArea } = Input;

// Status options for the modal
const STATUS_OPTIONS = [
  "応募済",
  "書類選考中",
  "面接日設定済",
  "面接実施中",
  "内定済",
  "内定承諾済",
  "入職済",
  "不採用",
  "内定辞退",
  "選考終了",
];

const ProcessDetail = ({
  processes,
  getProcessesByStatus,
  getJobNumbersByStatus,
}) => {
  const [message_id, setMessage_id] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [memberData, setMemberData] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [memos, setMemos] = useState({});

  // Create job post link
  const jobPostLink = useCallback((jobPost) => {
    const jobType = getJobTypeValue(JobType, jobPost.type);
    return `/${jobType}/${jobPost.jobpost_id}`;
  }, []);

  // Handle profile modal
  const handleProfileModalOpen = useCallback((data) => {
    setMemberData(data);
    setProfileModalOpen(true);
  }, []);

  const handleProfileModalClose = useCallback(() => {
    setProfileModalOpen(false);
    setMemberData(null);
  }, []);

  // Open job post in new tab
  const handleJobpostPageOpen = useCallback(
    (data) => {
      window.open(jobPostLink(data), "_blank");
    },
    [jobPostLink]
  );

  // Handle status modal and changes
  const handleStatusModalOpen = useCallback((id) => {
    setMessage_id(id);
    setStatusModalOpen(true);
  }, []);

  const handleStatusChange = useCallback(
    async (value) => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/v1/message/${message_id}`,
          {
            status: value,
            updated_at: new Date(),
          }
        );

        if (response.data.error) {
          message.error(response.data.message);
          return;
        }
        if (response.data.isAuthError) return;

        message.success("ステータスを変更しました。");
        getProcessesByStatus();
        getJobNumbersByStatus(); // Add this line to update the job numbers
      } catch (error) {
        message.error("ステータスの更新に失敗しました。");
        console.error("Status update error:", error);
      } finally {
        setMessage_id("");
        setStatusModalOpen(false);
      }
    },
    [message_id, getProcessesByStatus, getJobNumbersByStatus]
  );

  // Handle memo changes and saves
  const handleMemoChange = useCallback((messageId, value) => {
    setMemos((prev) => ({
      ...prev,
      [messageId]: value,
    }));
  }, []);

  const handleMemoSave = useCallback(
    async (messageId) => {
      try {
        const memoValue = memos[messageId];
        const response = await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/v1/message/${messageId}`,
          {
            memo: memoValue,
            updated_at: new Date(),
          }
        );

        if (response.data.error) {
          message.error(response.data.message);
          return;
        }
        if (response.data.isAuthError) return;

        message.success("メモを保存しました。");
        getProcessesByStatus();
      } catch (error) {
        message.error("メモの保存に失敗しました。");
        console.error("Memo save error:", error);
      }
    },
    [memos, getProcessesByStatus]
  );

  // Memoize table columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => [
      {
        title: "会員番号・基本情報",
        dataIndex: "profile",
        key: "profile",
        render: (_, record) => (
          <div className="flex flex-col gap-2 items-start h-full max-w-40">
            <div className="flex justify-start gap-4 w-full">
              <p
                className="text-sm font-bold truncate max-w-[120px]"
                title={record.user?.name}
              >
                {record.user?.name}
              </p>
              <p
                className="text-sm truncate max-w-[80px]"
                title={record.user?.hiraganaName}
              >
                {record.user?.hiraganaName}
              </p>
            </div>
            <div className="flex justify-start gap-4">
              <p className="text-sm">{record.user?.member_id}</p>
              <p className="text-sm">{record.user?.gender}</p>
              <p className="text-sm">
                {new Date().getFullYear() -
                  new Date(record.user?.birthday).getFullYear()}
              </p>
            </div>
            <button
              className="text-[#FF2A3B] hover:underline duration-300"
              onClick={() => handleProfileModalOpen(record.user)}
            >
              プロフィールを確認
            </button>
          </div>
        ),
        width: 200,
      },
      {
        title: "対象求人",
        dataIndex: "jobpost",
        key: "jobpost",
        render: (_, record) => (
          <div className="flex flex-col gap-2 items-start">
            <p
              className="text-sm truncate max-w-[180px]"
              title={record.facility?.name}
            >
              {record.facility?.name}
            </p>
            <p
              className="text-sm truncate max-w-[180px]"
              title={record.jobPost?.type}
            >
              {record.jobPost?.type}
            </p>
            <p className="text-sm">{record.jobPost?.employment_type[0]}</p>
            <button
              className="text-[#FF2A3B] hover:underline duration-300"
              onClick={() => handleJobpostPageOpen(record.jobPost)}
            >
              求人を確認
            </button>
          </div>
        ),
        width: 200,
      },
      {
        title: "応募日・更新日",
        dataIndex: "date",
        key: "date",
        render: (_, record) => (
          <div className="flex flex-col gap-1 items-start">
            <p className="text-sm">応募日：</p>
            <p className="text-sm">
              {moment(record.created_at).format("YYYY/MM/DD")}
            </p>
            <p className="text-sm">更新日：</p>
            <p className="text-sm">
              {moment(record.updated_at).format("YYYY/MM/DD")}
            </p>
          </div>
        ),
        width: 120,
      },
      {
        title: "ステータス",
        dataIndex: "status",
        key: "status",
        render: (_, record) => (
          <div className="flex flex-col items-start">
            <p className="text-sm">{record.status}</p>
            <Button
              className="px-4 py-1 mt-2 rounded-lg"
              onClick={() => handleStatusModalOpen(record.message_id)}
            >
              変更
            </Button>
          </div>
        ),
        width: 120,
      },
      {
        title: "メモ",
        dataIndex: "memo",
        key: "memo",
        render: (_, record) => (
          <div className="flex flex-col items-start">
            <TextArea
              className="w-full border-[1px] h-16"
              value={memos[record.message_id] ?? record.memo}
              onChange={(e) =>
                handleMemoChange(record.message_id, e.target.value)
              }
            />
            <Button
              className="px-4 py-1 mt-2 rounded-lg text-center w-full"
              onClick={() => handleMemoSave(record.message_id)}
            >
              保存
            </Button>
          </div>
        ),
        width: 100,
      },
    ],
    [
      handleProfileModalOpen,
      handleJobpostPageOpen,
      handleStatusModalOpen,
      handleMemoChange,
      handleMemoSave,
      memos,
    ]
  );

  // Memoize data transformation to prevent unnecessary re-renders
  const data = useMemo(
    () =>
      processes.map((process) => ({
        user: process.user_id,
        facility: process.facility_id,
        jobPost: process.jobpost_id,
        created_at: process.created_at,
        updated_at: process.updated_at,
        status: process.status,
        message_id: process.message_id,
        memo: process.memo,
        key: process.message_id,
      })),
    [processes]
  );

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 20,
          position: ["bottomCenter"],
        }}
        bordered
        size="small"
        rowClassName="align-top"
        className="[&_.ant-table-cell]:!whitespace-nowrap"
      />

      <MemberDetailModal
        open={profileModalOpen}
        onCancel={handleProfileModalClose}
        memberData={memberData}
      />

      <Modal
        open={statusModalOpen}
        onCancel={() => setStatusModalOpen(false)}
        title="ステータス変更"
        footer={null}
        width={300}
        className="modal"
      >
        {STATUS_OPTIONS.map((status) => (
          <div
            key={status}
            className="text-center p-1 border-t-[1px] hover:bg-slate-300 cursor-pointer"
            onClick={() => handleStatusChange(status)}
          >
            {status}
          </div>
        ))}
      </Modal>
    </>
  );
};

export default ProcessDetail;
