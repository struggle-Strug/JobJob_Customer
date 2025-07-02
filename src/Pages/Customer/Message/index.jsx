"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { message as antdMessage, Spin } from "antd";
import MessageDetails from "./MessageDetails";
import { Helmet } from "react-helmet";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState("");
  const [status, setStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const getMessages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/message/company`
      );
      if (response.data.error) {
        antdMessage.error(response.data.message);
        return;
      }
      if (response.data.isAuthError) return;
      setMessages(response.data.messages);
      // Apply initial filtering
      filterMessages(response.data.messages, status);
    } catch (error) {
      if (error.status != 401) {
        antdMessage.error("メッセージの取得に失敗しました");
        console.error("Error fetching messages:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Update a specific message in the messages array
  const updateMessage = (updatedMessage) => {
    if (!updatedMessage || !updatedMessage._id) return;

    // Update the message in the messages array
    const updatedMessages = messages.map((msg) =>
      msg._id === updatedMessage._id ? { ...msg, unread: false } : msg
    );

    setMessages(updatedMessages);

    // Re-apply filtering with updated messages
    filterMessages(updatedMessages, status);
  };

  // Filter messages based on status
  const filterMessages = (messagesToFilter, currentStatus) => {
    const filtered = messagesToFilter?.filter((message) => {
      if (currentStatus === "all") return true;
      if (currentStatus === "unread") {
        // Check if the message is unread
        return message.unread === true;
      }
      if (currentStatus === "unreply") {
        // Check if the last message is from the first person (needs a reply)
        return (
          message.content &&
          message.content.length > 0 &&
          message.content[message.content.length - 1].sender === message.first
        );
      }
      return true;
    });

    setFilteredMessages(filtered || []);
  };

  // Handle status change
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    filterMessages(messages, newStatus);
  };

  // Handle message selection
  const handleSelectMessage = (messageId) => {
    setSelectedMessageId(messageId);
  };

  useEffect(() => {
    getMessages();
  }, []);

  const calculateAge = (birthday) => {
    if (!birthday) return "";
    return new Date().getFullYear() - birthday.split("-")[0];
  };

  return (
    <>
      <Helmet>
        <title>メッセージ | JobJob (ジョブジョブ)</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="grid grid-cols-4 bg-white h-screen rounded-lg shadow-xl overflow-hidden">
        {/* Message List */}
        <div className="col-span-1 border-r border-gray-200 flex flex-col h-full overflow-hidden">
          {/* Filter Buttons */}
          <div className="flex items-start gap-2 p-3 border-b border-gray-200 bg-white">
            <button
              className={`text-xs ${
                status === "all"
                  ? "text-black font-bold underline"
                  : "text-[#343434]"
              }`}
              onClick={() => handleStatusChange("all")}
            >
              すべて
            </button>
            <button
              className={`text-xs ${
                status === "unread"
                  ? "text-black font-bold underline"
                  : "text-[#343434]"
              }`}
              onClick={() => handleStatusChange("unread")}
            >
              未読
            </button>
            <button
              className={`text-xs ${
                status === "unreply"
                  ? "text-black font-bold underline"
                  : "text-[#343434]"
              }`}
              onClick={() => handleStatusChange("unreply")}
            >
              未返信
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Spin size="default" tip="読み込み中..." />
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="flex justify-center items-center h-full text-gray-500">
                メッセージがありません
              </div>
            ) : (
              filteredMessages?.map((message) => {
                // Check if this message is the last sender
                const lastMessage =
                  message.content && message.content.length > 0
                    ? message.content[message.content.length - 1]
                    : null;
                const isLastFromOther =
                  lastMessage && lastMessage.sender === message.first;
                const isUnread = message.unread === true;

                return (
                  <div
                    key={message._id}
                    className={`flex flex-col border-b border-gray-200 p-3 cursor-pointer transition-colors duration-200 ${
                      selectedMessageId === message._id
                        ? "bg-gray-200"
                        : "bg-transparent"
                    } hover:bg-gray-100`}
                    onClick={() => handleSelectMessage(message._id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium">
                          {message.user_id?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {message.user_id?.member_id}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {isUnread && (
                          <span
                            className="h-2 w-2 rounded-full bg-red-500"
                            title="未読"
                          ></span>
                        )}
                        {isLastFromOther && (
                          <span
                            className="h-2 w-2 rounded-full bg-blue-500"
                            title="未返信"
                          ></span>
                        )}
                      </div>
                    </div>

                    <div className="mt-1">
                      <p className="text-xs text-gray-700">
                        {calculateAge(message.user_id?.birthday)}歳・
                        {message.user_id?.gender}
                      </p>
                      <p className="text-xs text-gray-700">
                        {message.facility_id?.name}
                      </p>
                    </div>

                    {lastMessage && (
                      <>
                        <p className="text-xs break-words line-clamp-2 mt-2 text-gray-600">
                          {lastMessage.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 text-right">
                          {moment(lastMessage.date).format("YYYY/MM/DD HH:mm")}
                        </p>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Message Details */}
        <div className="col-span-3 h-full overflow-hidden">
          <MessageDetails
            id={selectedMessageId}
            onMessageSent={getMessages}
            onMessageRead={updateMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Message;
