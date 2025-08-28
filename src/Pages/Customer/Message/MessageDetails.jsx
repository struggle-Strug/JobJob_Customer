"use client";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getJobValueByKey } from "../../../utils/getFunctions";
import MemberDetailModal from "../ProcessManagementPage/MemberDetailModal";
import { Button, Upload, message as Message, Spin, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { GoPaperclip } from "react-icons/go";
import { toast } from "react-hot-toast";

import { IoRefreshOutline } from "react-icons/io5";
import moment from "moment";

const MessageDetails = ({ id, onMessageSent, onMessageRead }) => {
  const [userProfileModal, setUserProfileModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const previousIdRef = useRef(null);

  const getMessage = async (forceRefresh = false) => {
    if (!id) return;

    const isNewMessage = id !== previousIdRef.current;

    if (isNewMessage || forceRefresh) {
      setIsLoading(isNewMessage);
      setIsRefreshing(forceRefresh);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/v1/message/company/${id}`
        );
        if (res.data.error) {
          toast.error(res.data.message);
          return;
        }

        const messageDetails = res.data.messageDetails;
        setMessage(messageDetails);
        await onMessageSent();

        // If this is a new message being viewed or a forced refresh
        if (isNewMessage || forceRefresh) {
          // Mark as read if it was unread
          if (messageDetails.unread) {
            await markMessageAsRead(messageDetails);
          }
          // Update the previous id reference for new messages
          if (isNewMessage) {
            previousIdRef.current = id;
          }
        }
      } catch (error) {
        toast.error("メッセージの取得に失敗しました");
        console.error("Error fetching message details:", error);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  };

  const refreshMessage = async () => {
    await getMessage(true);
    // Also refresh the message list in the parent component
    if (onMessageSent) {
      onMessageSent();
    }
    toast.success("メッセージを更新しました");
  };

  const markMessageAsRead = async (messageToMark) => {
    try {
      // Call API to mark message as read
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/message/read/${
          messageToMark._id
        }`
      );

      // Update the message locally
      const updatedMessage = { ...messageToMark, unread: false };
      setMessage(updatedMessage);

      // Notify parent component about the read status change
      if (onMessageRead) {
        onMessageRead(updatedMessage);
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (message?.content?.length > 0) {
      scrollToBottom();
    }
  }, [message]);

  const beforeUpload = () => {
    return false; // Prevent auto upload
  };

  const handleChange = (info) => {
    setFileList([...info.fileList]);
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      return [];
    }

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/file/multi`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("ファイルアップロード成功!");
      return response.data.files;
    } catch (error) {
      toast.error("ファイルアップロードに失敗しました");
      console.error("Upload error:", error);
      return [];
    }
  };

  const sendMessage = async () => {
    if (!content.trim() && fileList.length === 0) {
      toast.warning("メッセージまたはファイルを追加してください");
      return;
    }

    setIsSending(true);
    try {
      const files = await handleUpload();
      const messageData = {
        message_id: message?.message_id,
        message: content,
        sender: message?.second,
        recevier: message?.first,
        files: files || [],
      };

      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/message/send`,
        messageData
      );

      if (res.data.error) {
        toast.error(res.data.message);
        return;
      }

      toast.success("メッセージを送信しました");
      setFileList([]);
      setContent("");

      // Refresh the message details
      await getMessage(true);

      // Notify parent component to refresh messages list
      if (onMessageSent) {
        onMessageSent();
      }
    } catch (error) {
      toast.error("メッセージの送信に失敗しました");
      console.error("Send message error:", error);
    } finally {
      setIsSending(false);
    }
  };

  const calculateAge = (birthday) => {
    return new Date().getFullYear() - birthday.split("-")[0];
  };

  useEffect(() => {
    if (id) {
      getMessage();
    } else {
      // Reset message when id is cleared
      setMessage(null);
      previousIdRef.current = null;
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" tip="読み込み中..." />
      </div>
    );
  }

  if (!message) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
        <GoPaperclip className="h-12 w-12 text-gray-300" />
        <p>メッセージを選択してください</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white p-4 border-b shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">
            <span className="text-gray-700">
              {message?.facility_id.name}({message?.jobpost_id?.type}/
              {message?.jobpost_id?.employment_type?.[0]})
            </span>
          </p>
          <Tooltip title="メッセージを更新">
            <button
              onClick={refreshMessage}
              disabled={isRefreshing}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <IoRefreshOutline
                className={`h-5 w-5 text-gray-600 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
            </button>
          </Tooltip>
        </div>
        <div className="flex justify-between w-full mt-3">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-xs font-semibold text-gray-500 block mb-1">
                応募者
              </span>
              <span className="text-sm">{message?.user_id.name}</span>
              <span className="text-xs text-gray-500 ml-2">
                ({message?.user_id.member_id})
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 block mb-1">
                プロフィール
              </span>
              <span className="text-sm">
                {calculateAge(message?.user_id.birthday)}歳・
                {message?.user_id.gender}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {message?.jobPost_id && (
              <Link
                to={`${import.meta.env.VITE_APP_FRONTEND_URL}/${getJobValueByKey(message.jobpost_id?.type)}/${
                  message.jobPost_id
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#343434] hover:text-[#FF2A3B] hover:underline duration-300 px-3 py-1 border border-gray-200 rounded-md"
              >
                求人を確認
              </Link>
            )}
            <button
              className="text-sm font-medium text-[#343434] hover:text-[#FF2A3B] hover:underline duration-300 px-3 py-1 border border-gray-200 rounded-md"
              onClick={() => setUserProfileModal(true)}
            >
              プロフィールを確認
            </button>
          </div>
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {isRefreshing ? (
          <div className="flex justify-center py-4">
            <Spin size="small" tip="更新中..." />
          </div>
        ) : (
          <div className="space-y-6">
            {message?.content?.map((contentMessage, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  contentMessage.sender === message.first
                    ? "items-start"
                    : "items-end"
                }`}
              >
                <div className="flex flex-col max-w-[70%]">
                  <div
                    className={`rounded-lg ${
                      contentMessage.sender === message.first
                        ? "bg-gray-100 text-gray-800"
                        : "bg-blue-50 text-gray-800"
                    }`}
                  >
                    {contentMessage?.message && contentMessage.message !== "" && (
                      <pre className="text-sm p-4 leading-relaxed whitespace-pre-wrap break-words">
                        {contentMessage.message}
                      </pre>
                    )}
                  </div>

                  {contentMessage?.files && contentMessage.files.length > 0 && (
                    <div className="flex flex-col gap-1 mt-2 ml-1">
                      {contentMessage.files.map((file, fileIndex) => (
                        <Link
                          key={fileIndex}
                          to={`${
                            import.meta.env.VITE_APP_API_URL
                          }/api/v1/file/download/${file.fileUrl
                            .split("/")
                            .pop()}`}
                          className="text-xs text-blue-600 hover:text-[#FF2A3B] duration-300 flex items-center"
                          download={file.fileName}
                        >
                          <GoPaperclip className="h-3 w-3 mr-1" />
                          <span className="underline">{file.fileName}</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="text-xs text-gray-500 mt-1 ml-1">
                    {contentMessage.date &&
                      moment(contentMessage.date).format("YYYY/MM/DD HH:mm")}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="bg-white p-4 border-t shadow-md">
        {/* <Upload
          fileList={fileList}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          multiple
          className="mb-2"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="bg-gray-100 p-2 rounded-full hover:text-[#FF2A3B] hover:bg-gray-200 duration-300 hover:cursor-pointer">
              <GoPaperclip className="h-4 w-4" />
            </div>
            <p className="text-xs">
              ※添付ファイルは送信先の事業所には公開されません
            </p>
          </div>
        </Upload> */}

        <TextArea
          placeholder="返信を書いてください"
          className="w-full border border-gray-300 rounded-md resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
        />

        <div className="flex justify-center mt-4">
          <Button
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 h-10 rounded-md flex items-center justify-center"
            onClick={sendMessage}
            loading={isSending}
            disabled={isSending || isRefreshing}
          >
            {isSending ? "送信中..." : "送信する"}
          </Button>
        </div>
      </div>

      {message?.user_id && (
        <MemberDetailModal
          open={userProfileModal}
          onCancel={() => setUserProfileModal(false)}
          memberData={message.user_id}
        />
      )}
    </div>
  );
};

export default MessageDetails;
