"use client";

import { message, Pagination, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FacilityDetail from "./FacilityDetail";
import { useAuth } from "../../../context/AuthContext";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";

const FacilityPage = () => {
  const { customer } = useAuth();
  const [facilities, setFacilities] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);
  const [facility, setFacility] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedFacilityId, setSelectedFacilityId] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const itemsPerPage = 10; // Number of facilities to show per page

  const getFacilities = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/facility/customer`
      );

      if (response.data.error) {
        message.error(response.data.message || "施設情報の取得に失敗しました");
        return;
      }
      if (response.data.isAuthError) return;

      setFacilities(response.data.facility || []);

      // If facilities exist, select the first one by default
      if (response.data.facility?.length > 0) {
        const firstFacility = response.data.facility[0];
        setSelectedFacilityId(firstFacility.facility_id);
        getFacility(firstFacility.facility_id);
        getJobPosts(firstFacility.facility_id);
      }
    } catch (error) {
      if (error.status != 401) {
        console.error("Error fetching facilities:", error);
        message.error("施設情報の取得中にエラーが発生しました");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the facility list
    const facilityList = document.getElementById("facility-list");
    if (facilityList) {
      facilityList.scrollTop = 0;
    }
  };

  const getJobPosts = useCallback(
    async (id) => {
      try {
        setLoadingDetail(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/jobpost/facility/${id}`
        );

        if (response.data.error) {
          message.error(
            response.data.message || "求人情報の取得に失敗しました"
          );
          return;
        }
        if (response.data.isAuthError) return;

        // Only update if the data actually changed
        const newJobPosts = response.data.jobposts || [];
        if (JSON.stringify(jobPosts) !== JSON.stringify(newJobPosts)) {
          setJobPosts(newJobPosts);
        }
      } catch (error) {
        if (error.status != 401) {
          console.error("Error fetching job posts:", error);
          message.error("求人情報の取得中にエラーが発生しました");
        }
      }
    },
    [jobPosts]
  );

  const getFacility = useCallback(
    async (id) => {
      // Don't fetch if we already have this facility selected
      if (facility?.facility_id === id) return;

      try {
        setLoadingDetail(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/facility/${id}`
        );

        if (response.data.error) {
          message.error(
            response.data.message || "施設詳細の取得に失敗しました"
          );
          return;
        }
        if (response.data.isAuthError) return;

        setFacility(response.data.facility);
      } catch (error) {
        if (error.status != 401) {
          console.error("Error fetching facility details:", error);
          message.error("施設詳細の取得中にエラーが発生しました");
        }
      } finally {
        setLoadingDetail(false);
      }
    },
    [facility?.facility_id]
  );

  const handleFacilityClick = (id) => {
    if (id === selectedFacilityId) return; // Don't reload if already selected

    setSelectedFacilityId(id);
    getJobPosts(id);
    getFacility(id);
  };

  useEffect(() => {
    getFacilities();
    //window.scrollTo({ top: 0, behavior: "smooth" });

    // Add cleanup function
    return () => {
      // Reset states when component unmounts
      setFacility(null);
      setJobPosts([]);
      setSelectedFacilityId(null);
    };
  }, [getFacilities]);

  const paginatedFacilities = facilities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Helmet>
        <title>施設・求人情報一覧 | JobJob (ジョブジョブ)</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="w-full min-h-screen p-4 bg-gray-50">
        <div className="flex flex-col md:flex-row w-full bg-white rounded-lg shadow-lg min-h-[calc(100vh-2rem)] overflow-hidden">
          {/* Sidebar with facility list - add min-width and max-width to prevent shrinking */}
          <div className="w-full md:w-1/4 lg:w-1/5 md:min-w-[250px] md:max-w-[300px] border-b-[1px] md:border-b-0 md:border-r-[1px] border-[#e7e7e7] flex flex-col">
            <div className="p-4 bg-gray-50 border-b border-[#e7e7e7] sticky top-0 z-10">
              <Link
                to="/customers/facility/add"
                className="flex items-center justify-center gap-2 bg-white hover:bg-[#ffdbdb] text-center font-bold text-sm duration-300 text-[#FF2A3B] hover:text-[#FF2A3B] px-4 py-3 rounded-lg shadow-sm hover:shadow-md w-full"
              >
                <PlusCircleOutlined />
                施設を新規登録
              </Link>
            </div>

            <div
              id="facility-list"
              className="overflow-y-auto flex-grow"
              style={{ maxHeight: "calc(100vh - 6.45rem)" }}
            >
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Spin size="large" />
                </div>
              ) : facilities.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <p>施設が登録されていません</p>
                  <p className="mt-2 text-sm">
                    「施設を新規登録」から施設を追加してください
                  </p>
                </div>
              ) : (
                paginatedFacilities.map((facility) => (
                  <div
                    key={facility?._id}
                    className={`flex w-full justify-start p-3 gap-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition-colors duration-200 ${
                      selectedFacilityId === facility?.facility_id
                        ? "bg-gray-100"
                        : ""
                    }`}
                    onClick={() => handleFacilityClick(facility?.facility_id)}
                  >
                    <div className="w-1/3 aspect-video overflow-hidden rounded-md flex-shrink-0">
                      {facility?.photos?.length > 0 ? (
                        <img
                          src={facility?.photos[0].url || "/placeholder.svg"}
                          alt={facility?.name}
                          className={`w-full h-full object-${
                            75 / 42 <
                            facility?.photos[0].width /
                              facility?.photos[0].height
                              ? "cover"
                              : "contain"
                          }`}
                        />
                      ) : (
                        <img
                          src="/assets/images/noimage.png"
                          alt={facility?.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium line-clamp-2">
                        {facility?.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {facility?.prefecture} {facility?.city}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {facilities.length > itemsPerPage && (
              <div className="p-4 border-t border-[#e7e7e7] bg-white sticky bottom-0">
                <Pagination
                  current={currentPage}
                  total={facilities.length}
                  pageSize={itemsPerPage}
                  onChange={handlePageChange}
                  size="small"
                  showSizeChanger={false}
                  className="flex justify-center"
                />
              </div>
            )}
          </div>

          {/* Main content area - add flex-grow and overflow handling */}
          <div className="flex-grow overflow-auto">
            {loadingDetail ? (
              <div className="flex justify-center items-center h-full">
                <Spin size="large" />
              </div>
            ) : facility ? (
              <FacilityDetail
                facility={facility}
                jobPosts={jobPosts}
                setJobPosts={setJobPosts}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <img
                  src="/assets/images/noimage.png"
                  alt="No facility selected"
                  className="w-32 h-32 object-contain opacity-30 mb-4"
                />
                <p className="text-lg font-bold text-gray-400 mb-2">
                  施設を選択してください
                </p>
                <p className="text-sm text-gray-400">
                  左側のリストから施設を選択すると、詳細情報が表示されます
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FacilityPage;
