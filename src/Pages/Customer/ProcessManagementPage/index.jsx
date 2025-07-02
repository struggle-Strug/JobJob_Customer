import { Helmet } from "react-helmet";
import { message } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import ProcessDetail from "./ProcessDetail";

const ProcessManagementPage = () => {
  const { customer } = useAuth();
  const [status, setStatus] = useState("allOnGoings");
  const [processes, setProcesses] = useState([]);
  const [jobNumbers, setJobNumbers] = useState([]);

  const getProcessesByStatus = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/message/${customer?._id}/${status}`
      );
      if (res.data.error) return message.error(res.data.error);
      if (res.data.isAuthError) return;
      setProcesses(res.data.processes);
    } catch (error) {
      if (error.status != 401) {
        console.error(error);
        message.error("エラーが発生しました");
      }
    }
  }, [status, customer]);

  const getJobNumbersByStatus = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/message/jobNumbers`
      );
      if (res.data.error) return message.error(res.data.error);
      if (res.data.isAuthError) return;
      setJobNumbers(res.data.jobNumbers);
    } catch (error) {
      if (error.status != 401) {
        console.error(error);
        message.error("エラーが発生しました");
      }
    }
  }, []);

  useEffect(() => {
    if (customer?._id) {
      getProcessesByStatus();
    }
  }, [status, customer, getProcessesByStatus]);

  useEffect(() => {
    getJobNumbersByStatus();
    //window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <title>選考管理 | JobJob (ジョブジョブ)</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="w-full min-h-screen">
        <div className="grid grid-cols-5 w-full bg-white rounded-lg shadow-xl min-h-screen">
          <div className="col-span-1 flex flex-col border-r-[1px]">
            <p className="text-center text-sm text-[#343434] font-bold p-2 border-b-[1px]">
              選考中
            </p>
            <div
              className={`flex justify-between ${
                status === "allOnGoings" && "font-bold"
              }  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}
              onClick={() => setStatus("allOnGoings")}
            >
              <p className="text-center text-sm text-[#343434] p-2">すべて</p>
              <p className="text-center text-sm text-[#343434] p-2 number">
                {jobNumbers?.allOnGoings}件
              </p>
            </div>
            <div
              className={`flex justify-between ${
                status === "応募済" && "font-bold"
              }  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}
              onClick={() => setStatus("応募済")}
            >
              <p className="text-center text-sm text-[#343434] p-2">応募済</p>
              <p className="text-center text-sm text-[#343434] p-2 number">
                {jobNumbers?.応募済}件
              </p>
            </div>
            <div
              className={`flex justify-between ${
                status === "書類選考中" && "font-bold"
              }  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}
              onClick={() => setStatus("書類選考中")}
            >
              <p className="text-center text-sm text-[#343434] p-2">
                書類選考中
              </p>
              <p className="text-center text-sm text-[#343434] p-2 number">
                {jobNumbers?.書類選考中}件
              </p>
            </div>
            <div
              className={`flex justify-between ${
                status === "面接日設定済" && "font-bold"
              }  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}
              onClick={() => setStatus("面接日設定済")}
            >
              <p className="text-center text-sm text-[#343434] p-2">
                面接日設定済
              </p>
              <p className="text-center text-sm text-[#343434] p-2 number">
                {jobNumbers?.面接日設定済}件
              </p>
            </div>
            <div
              className={`flex justify-between ${
                status === "面接実施中" && "font-bold"
              }  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}
              onClick={() => setStatus("面接実施中")}
            >
              <p className="text-center text-sm text-[#343434] p-2">
                面接実施中
              </p>
              <p className="text-center text-sm text-[#343434] p-2 number">
                {jobNumbers?.面接実施中}件
              </p>
            </div>
            <div
              className={`flex justify-between ${
                status === "内定済" && "font-bold"
              }  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}
              onClick={() => setStatus("内定済")}
            >
              <p className="text-center text-sm text-[#343434] p-2">内定済</p>
              <p className="text-center text-sm text-[#343434] p-2 number">
                {jobNumbers?.内定済}件
              </p>
            </div>
            <div
              className={`flex justify-between ${
                status === "内定承諾済" && "font-bold"
              }  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}
              onClick={() => setStatus("offerAccepted")}
            >
              <p className="text-center text-sm text-[#343434] p-2">
                内定承諾済
              </p>
              <p className="text-center text-sm text-[#343434] p-2 number">
                {jobNumbers?.内定承諾済}件
              </p>
            </div>
            <p className="text-center text-sm text-[#343434] font-bold p-2 border-b-[1px]">
              選考済み
            </p>
            <div
              className={`flex justify-between ${
                status === "allEnds" && "font-bold"
              }  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}
              onClick={() => setStatus("allEnds")}
            >
              <p className="text-center text-sm text-[#343434] p-2">すべて</p>
              <p className="text-center text-sm text-[#343434] p-2 number">
                {jobNumbers?.allEnds}件
              </p>
            </div>
            <div
              className={`flex justify-between ${
                status === "入職済" && "font-bold"
              }  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}
              onClick={() => setStatus("入職済")}
            >
              <p className="text-center text-sm text-[#343434] p-2">入職済</p>
              <p className="text-center text-sm text-[#343434] p-2 number">
                {jobNumbers?.入職済}件
              </p>
            </div>
            <div
              className={`flex justify-between ${
                status === "不採用" && "font-bold"
              }  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}
              onClick={() => setStatus("不採用")}
            >
              <p className="text-center text-sm text-[#343434] p-2">不採用</p>
              <p className="text-center text-sm text-[#343434] p-2 number">
                {jobNumbers?.不採用}件
              </p>
            </div>
            <div
              className={`flex justify-between ${
                status === "内定辞退" && "font-bold"
              }  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}
              onClick={() => setStatus("内定辞退")}
            >
              <p className="text-center text-sm text-[#343434] p-2">内定辞退</p>
              <p className="text-center text-sm text-[#343434] p-2 number">
                {jobNumbers?.内定辞退}件
              </p>
            </div>
            <div
              className={`flex justify-between ${
                status === "選考終了" && "font-bold"
              }  border-b-[1px] hover:bg-slate-200 hover:cursor-pointer duration-300`}
              onClick={() => setStatus("選考終了")}
            >
              <p className="text-center text-sm text-[#343434] p-2">選考終了</p>
              <p className="text-center text-sm text-[#343434] p-2 number">
                {jobNumbers?.選考終了}件
              </p>
            </div>
          </div>
          <div className="col-span-4 p-6">
            <ProcessDetail
              processes={processes}
              getProcessesByStatus={getProcessesByStatus}
              getJobNumbersByStatus={getJobNumbersByStatus}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessManagementPage;
