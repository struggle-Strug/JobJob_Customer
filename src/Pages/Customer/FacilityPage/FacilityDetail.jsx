"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { message, Modal, Select, Spin } from "antd";
import axios from "axios";
import FacilityPreview from "./FacilityPreview";
import JobPostPreview from "./JobPostPreview";

// Status badge component to reduce repetition
const StatusBadge = ({ status }) => {
  const statusText = useMemo(() => {
    switch (status) {
      case "draft":
        return "下書き";
      case "pending":
        return "掲載申請中";
      case "rejected":
        return "差し戻し";
      case "allowed":
        return "掲載中";
      case "ended":
        return "受付終了";
      default:
        return "";
    }
  }, [status]);

  return (
    <p className="lg:text-xs text-[0.5rem] py-1 px-2 bg-[#FF2A3B] text-white rounded-lg text-center">
      {statusText}
    </p>
  );
};

const FacilityDetail = ({ facility, jobPosts, setJobPosts }) => {
  // State management
  const [companyFacilities, setCompanyFacilities] = useState([]);
  const [selectedCompanyFacility, setSelectedCompanyFacility] = useState("");
  const [selectedJobPosts, setSelectedJobPosts] = useState([]);
  const [selectedJobPostId, setSelectedJobPostId] = useState("");
  const [filteredJobPosts, setFilteredJobPosts] = useState([]);
  const [copyJobPost, setCopyJobPost] = useState(false);
  const [facilityPreviewModal, setFacilityPreviewModal] = useState(false);
  const [jobPostPreviewModal, setJobPostPreviewModal] = useState(false);
  const [jobPostPreviewData, setJobPostPreviewData] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState({
    facilities: false,
    jobPosts: false,
    copying: false,
  });

  // Memoized values
  const companyFacilitiesOptions = useMemo(
    () =>
      companyFacilities?.map((facility) => ({
        value: facility.facility_id,
        label: `${facility.name}`,
      })),
    [companyFacilities]
  );

  const selectedJobPostsOptions = useMemo(
    () =>
      selectedJobPosts?.map((jobPost) => ({
        value: jobPost.jobpost_id,
        label: `${jobPost.type}・${jobPost.employment_type[0]}・${jobPost.sub_title}`,
      })),
    [selectedJobPosts]
  );

  // Status counts for filter buttons
  const statusCounts = useMemo(() => {
    if (!jobPosts)
      return { all: 0, draft: 0, pending: 0, allowed: 0, ended: 0 };

    return {
      all: jobPosts.length,
      draft: jobPosts.filter((jobpost) => jobpost.allowed === "draft").length,
      pending: jobPosts.filter((jobpost) => jobpost.allowed === "pending")
        .length,
      allowed: jobPosts.filter((jobpost) => jobpost.allowed === "allowed")
        .length,
      ended: jobPosts.filter((jobpost) => jobpost.allowed === "ended").length,
    };
  }, [jobPosts]);

  // API calls
  const getFacilitiesByCompany = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, facilities: true }));
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/facility/getByCompany`
      );

      if (response.data.error) {
        toast.error(response.data.message || "施設情報の取得に失敗しました");
        return;
      }
      if (response.data.isAuthError) return;

      setCompanyFacilities(response.data.facilities || []);
    } catch (error) {
      console.error("Error fetching company facilities:", error);
      toast.error("施設情報の取得中にエラーが発生しました");
    } finally {
      setLoading((prev) => ({ ...prev, facilities: false }));
    }
  }, []);

  const getJobPostsByFacilityId = useCallback(async (facilityId) => {
    if (!facilityId) return;

    try {
      setLoading((prev) => ({ ...prev, jobPosts: true }));
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/v1/jobpost/facility/${facilityId}`
      );

      if (response.data.error) {
        toast.error(response.data.message || "求人情報の取得に失敗しました");
        return;
      }
      if (response.data.isAuthError) return;

      setSelectedJobPosts(response.data.jobposts || []);
    } catch (error) {
      console.error("Error fetching job posts:", error);
      toast.error("求人情報の取得中にエラーが発生しました");
    } finally {
      setLoading((prev) => ({ ...prev, jobPosts: false }));
    }
  }, []);

  const handleCopy = useCallback(async () => {
    if (!selectedJobPostId || !facility?.facility_id) {
      toast.error("求人と施設を選択してください");
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, copying: true }));
      const response = await axios.post(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/v1/jobpost/copy/${selectedJobPostId}`,
        {
          facility_id: facility.facility_id,
        }
      );

      if (response.data.error) {
        toast.error(response.data.error || "求人のコピーに失敗しました");
        return;
      }

      toast.success("求人をコピーしました", { duration: 5000 });
      setCopyJobPost(false);
      setSelectedCompanyFacility("");
      setSelectedJobPostId("");

      // Add the new job post to the beginning of the list
      setJobPosts((prev) => [response.data.jobPost, ...prev]);
    } catch (error) {
      console.error("Error copying job post:", error);
      toast.error("求人のコピー中にエラーが発生しました");
    } finally {
      setLoading((prev) => ({ ...prev, copying: false }));
    }
  }, [selectedJobPostId, facility?.facility_id, setJobPosts]);

  // Event handlers
  const handleJobPostPreview = useCallback((jobPost) => {
    setJobPostPreviewData(jobPost);
    setJobPostPreviewModal(true);
  }, []);

  const handleFilterChange = useCallback((status) => {
    setFilterStatus(status);
  }, []);

  // Effects
  useEffect(() => {
    document.title = "施設詳細";
    //window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (copyJobPost) {
      getFacilitiesByCompany();
    }
  }, [copyJobPost, getFacilitiesByCompany]);

  useEffect(() => {
    if (selectedCompanyFacility) {
      getJobPostsByFacilityId(selectedCompanyFacility);
    }
  }, [selectedCompanyFacility, getJobPostsByFacilityId]);

  // Filter job posts based on selected status
  useEffect(() => {
    if (!jobPosts) {
      setFilteredJobPosts([]);
      return;
    }

    if (filterStatus === "all") {
      setFilteredJobPosts(jobPosts);
      return;
    }

    setFilteredJobPosts(
      jobPosts.filter((jobPost) => jobPost.allowed === filterStatus)
    );
  }, [filterStatus, jobPosts]);

  // Render helpers
  const renderFacilityImage = () => {
    if (!facility?.photos)
      return (
        <img
          src="/assets/images/noimage.png"
          alt="No image"
          className="w-full h-32 aspect-video rounded-lg"
          onError={(e) => {
            e.target.src = "/assets/images/noimage.png";
          }}
        />
      );

    return facility.photos?.length === 0 ? (
      <img
        src="/assets/images/noimage.png"
        alt={facility.name}
        className="w-full h-32 aspect-video rounded-lg"
        onError={(e) => {
          e.target.src = "/assets/images/noimage.png";
        }}
      />
    ) : (
      <img
        src={facility.photos[0].url || "/placeholder.svg"}
        alt={facility.name}
        className={`w-full h-32 aspect-video object-${
          156 / 128 < facility.photos[0].width / facility.photos[0].height
            ? "cover"
            : "contain"
        } rounded-lg`}
        onError={(e) => {
          e.target.src = "/assets/images/noimage.png";
        }}
      />
    );
  };

  const renderJobPostImage = (jobPost) => {
    if (!jobPost?.picture)
      return (
        <img
          src="/assets/images/noimage.png"
          alt="No image"
          className="w-full h-24 aspect-video rounded-lg"
        />
      );

    return !jobPost.photos || jobPost.photos?.length === 0 ? (
      <img
        src="/assets/images/noimage.png"
        alt={`${jobPost?.facility?.name || ""}の${jobPost?.type || ""}求人(${jobPost?.employment_type || ""})`}
        className="w-full h-24 aspect-video rounded-lg"
      />
    ) : (
      <img
        src={jobPost?.photos[0].url || "/placeholder.svg"}
        alt={`${jobPost?.facility?.name || ""}の${jobPost?.type || ""}求人(${jobPost?.employment_type || ""})の写真1枚目${(jobPost?.photos[0].description) ? ("：" + jobPost?.photos[0].description) : ""}`}
        className={`w-full h-24 aspect-video object-${
          93 / 96 < jobPost.photos[0].width / jobPost.photos[0].height
            ? "cover"
            : "contain"
        } rounded-lg`}
        onError={(e) => {
          e.target.src = "/assets/images/noimage.png";
        }}
      />
    );
  };

  if (!facility) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">施設が選択されていません</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col p-4">
        {/* Facility header */}
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">{renderFacilityImage()}</div>
          <div className="col-span-3 flex flex-col">
            <div className="flex justify-between w-full">
              <StatusBadge status={facility.allowed} />
              <p className="lg:text-xs text-[0.5rem] py-1 px-2 rounded-lg">
                <Link
                  to={`/customers/facility/edit/${facility.facility_id}`}
                  className="text-[#FF2A3B] hover:underline duration-300"
                >
                  編集
                </Link>
                <button
                  className="text-[#FF2A3B] ml-4 hover:underline"
                  onClick={() => setFacilityPreviewModal(true)}
                >
                  プレビュー
                </button>
              </p>
            </div>
            <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434]">
              {facility.name}
            </p>
            <p className="lg:text-sm text-xs text-[#343434]">
              {facility.prefecture} {facility.facility_genre}
            </p>
            <div className="flex items-center justify-start gap-2">
              <p className="text-xs text-[#343434]">
                作成日時: {moment(facility.created_at).format("YYYY/MM/DD")}
              </p>
              <p className="text-xs text-[#343434]">
                更新日時: {moment(facility.updated_at).format("YYYY/MM/DD")}
              </p>
            </div>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-start justify-start mt-2 gap-2">
          <button
            className={`lg:text-xs text-[0.55rem] font-bold ${
              filterStatus === "all" ? "text-[#FF2A3B]" : "text-[#343434]"
            } hover:underline duration-300`}
            onClick={() => handleFilterChange("all")}
          >
            すべて：{statusCounts.all}件
          </button>
          <button
            className={`lg:text-xs text-[0.55rem] font-bold ${
              filterStatus === "draft" ? "text-[#FF2A3B]" : "text-[#343434]"
            } hover:underline duration-300`}
            onClick={() => handleFilterChange("draft")}
          >
            下書き：{statusCounts.draft}件
          </button>
          <button
            className={`lg:text-xs text-[0.55rem] font-bold ${
              filterStatus === "pending" ? "text-[#FF2A3B]" : "text-[#343434]"
            } hover:underline duration-300`}
            onClick={() => handleFilterChange("pending")}
          >
            掲載申請中：{statusCounts.pending}件
          </button>
          <button
            className={`lg:text-xs text-[0.55rem] font-bold ${
              filterStatus === "allowed" ? "text-[#FF2A3B]" : "text-[#343434]"
            } hover:underline duration-300`}
            onClick={() => handleFilterChange("allowed")}
          >
            掲載中：{statusCounts.allowed}件
          </button>
          <button
            className={`lg:text-xs text-[0.55rem] font-bold ${
              filterStatus === "ended" ? "text-[#FF2A3B]" : "text-[#343434]"
            } hover:underline duration-300`}
            onClick={() => handleFilterChange("ended")}
          >
            受付終了：{statusCounts.ended}件
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center w-full gap-4 py-2 mt-2 border-t-[1px] border-[#e7e7e7]">
          <Link
            to={`/customers/jobpost/${facility.facility_id}/add`}
            className={`lg:text-base md:text-sm text-xs text-[#FF2A3B] hover:text-white bg-[#ffdbdb] hover:bg-red-500 rounded-lg px-4 py-2 duration-300 `}
          >
            求人を新規登録
          </Link>
          <button
            className={`lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-2 hover:bg-[#ffe4e4] hover:text-red-500 duration-300 `}
            onClick={() => setCopyJobPost(true)}
          >
            求人をコピーして登録
          </button>
        </div>

        {/* Job posts list */}
        <div className="w-full flex flex-col border-t-[1px] border-[#e7e7e7]">
          {filteredJobPosts?.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>表示できる求人がありません</p>
            </div>
          ) : (
            filteredJobPosts.map((jobPost, index) => (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50"
              >
                <div className="col-span-1 flex flex-col gap-2">
                  {renderJobPostImage(jobPost)}
                  <StatusBadge status={jobPost?.allowed} />
                </div>
                <div className="col-span-5 flex flex-col gap-2">
                  <div className="flex justify-between w-full gap-2">
                    <div className="flex items-center justify-start gap-2">
                      <p className="lg:text-sm text-xs text-[#343434]">
                        {jobPost?.type}
                      </p>
                      <p className="lg:text-sm text-xs text-[#343434]">
                        {jobPost?.employment_type}
                      </p>
                    </div>
                    <p className="lg:text-xs text-[0.5rem] rounded-lg text-right">
                      <Link
                        to={`/customers/jobpost/edit/${jobPost.jobpost_id}`}
                        className="text-[#FF2A3B] hover:underline duration-300"
                      >
                        編集
                      </Link>
                      <button
                        className="text-[#FF2A3B] ml-4 hover:underline"
                        onClick={() => handleJobPostPreview(jobPost)}
                      >
                        プレビュー
                      </button>
                    </p>
                  </div>
                  <div className="flex justify-start w-full gap-2">
                    <p className="lg:text-sm text-xs text-[#343434]">求人ID:</p>
                    <p className="lg:text-sm text-xs text-[#343434]">
                      {jobPost?.jobpost_id}
                    </p>
                  </div>
                  <p className="lg:text-sm text-xs font-bold text-[#343434]">
                    {jobPost?.sub_title}
                  </p>
                  <div className="flex items-center justify-start gap-2">
                    <p className="text-xs text-[#343434]">
                      作成日時:{" "}
                      {moment(jobPost?.created_at).format("YYYY/MM/DD")}
                    </p>
                    <p className="text-xs text-[#343434]">
                      更新日時:{" "}
                      {moment(jobPost?.updated_at).format("YYYY/MM/DD")}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Copy job post modal */}
      <Modal
        open={copyJobPost}
        onCancel={() => setCopyJobPost(false)}
        footer={null}
        width={800}
        className="modal"
        maskClosable={!loading.copying}
        closable={!loading.copying}
      >
        <div className="p-4">
          <p className="lg:text-lg md:text-base text-sm font-bold text-[#343434] mb-4">
            求人をコピーして登録
          </p>

          {loading.facilities ? (
            <div className="flex justify-center items-center py-8">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <p className="lg:text-base text-sm text-[#343434] mb-6">
                コピーする対象の施設と求人を選択して、「登録」ボタンをクリックしてください。
              </p>
              <div className="flex items-center mt-4 px-4">
                <p className="lg:text-sm text-xs w-1/5">施設</p>
                <div className="flex items-center justify-start gap-2 w-3/4">
                  <Select
                    placeholder="施設を選択"
                    options={companyFacilitiesOptions}
                    value={selectedCompanyFacility}
                    onChange={(value) => setSelectedCompanyFacility(value)}
                    className="w-full"
                    disabled={loading.copying}
                  />
                </div>
              </div>

              {selectedCompanyFacility && (
                <div className="flex items-center mt-4 px-4">
                  <p className="lg:text-sm text-xs w-1/5">求人</p>
                  <div className="flex items-center justify-start gap-2 w-3/4">
                    {loading.jobPosts ? (
                      <div className="flex justify-center items-center w-full py-2">
                        <Spin size="small" />
                      </div>
                    ) : (
                      <Select
                        placeholder="求人を選択"
                        options={selectedJobPostsOptions}
                        value={selectedJobPostId}
                        onChange={(value) => setSelectedJobPostId(value)}
                        className="w-full"
                        disabled={loading.copying}
                        notFoundContent="求人が見つかりません"
                      />
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end px-12 mt-8">
                <button
                  className={`lg:text-base md:text-sm text-xs bg-[#ff6e7a] text-white rounded-lg px-4 py-2 hover:bg-[#ffe4e4] hover:text-red-500 duration-300 ${
                    loading.copying ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleCopy}
                  disabled={loading.copying || !selectedJobPostId}
                >
                  {loading.copying ? "処理中..." : "登録"}
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Facility preview modal */}
      {facilityPreviewModal && (
        <FacilityPreview
          open={facilityPreviewModal}
          onCancel={() => setFacilityPreviewModal(false)}
          data={facility}
        />
      )}

      {/* Job post preview modal */}
      {jobPostPreviewModal && jobPostPreviewData && (
        <JobPostPreview
          open={jobPostPreviewModal}
          onCancel={() => {
            setJobPostPreviewModal(false);
            setJobPostPreviewData(null);
          }}
          data={jobPostPreviewData}
        />
      )}
    </>
  );
};

export default React.memo(FacilityDetail, (prevProps, nextProps) => {
  // Only re-render if facility ID changes or if jobPosts length/content changes
  return (
    prevProps.facility?.facility_id === nextProps.facility?.facility_id &&
    prevProps.jobPosts?.length === nextProps.jobPosts?.length &&
    JSON.stringify(prevProps.jobPosts) === JSON.stringify(nextProps.jobPosts)
  );
});
