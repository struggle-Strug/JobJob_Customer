"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "antd";

const SkeletonGroup = ({ isLoading, children, delay = 300 }) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let timer;

    if (!isLoading) {
      // Start transition when loading is complete
      setOpacity(1);
      timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 500); // Match this with the CSS transition duration
    } else {
      setShowSkeleton(true);
      setOpacity(0);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  // If we're showing the skeleton, render the skeleton UI
  if (showSkeleton && isLoading) {
    return (
      <div className="animate-pulse opacity-60 bg-[#F8F8F8]">
        <JobListSkeleton />
      </div>
    );
  }

  // Otherwise, render the actual content with a fade-in effect
  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isLoading ? "blur-md" : "blur-none"
      }`}
      style={{ opacity }}
    >
      {children}
    </div>
  );
};

// Skeleton component that mimics the job listing layout
const JobListSkeleton = () => {
  return (
    <div className="w-full p-4 bg-[#F8F8F8]">
      <div className="container flex justify-between gap-8">
        <div className="flex flex-col items-center justify-start w-full">
          {/* Header skeleton */}
          <div className="flex flex-col justify-center bg-white rounded-lg p-4 w-full shadow-xl">
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>

          {/* Filter skeleton */}
          <div className="flex flex-col justify-center bg-white rounded-lg px-12 py-8 w-full shadow-xl mt-8">
            <Skeleton active paragraph={{ rows: 4 }} />
          </div>

          {/* Job listings skeleton */}
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex flex-col items-center justify-between bg-white rounded-2xl p-4 w-full shadow-xl mt-8"
            >
              <div className="flex md:flex-col lg:flex-row items-start justify-between w-full">
                <Skeleton.Image
                  className="md:w-full lg:w-1/2 aspect-video"
                  active
                />
                <div className="flex flex-col items-start justify-between p-4 w-full gap-8">
                  <Skeleton active paragraph={{ rows: 3 }} />
                </div>
              </div>
              <div className="flex items-center justify-between w-full gap-4 px-8 mt-6">
                <Skeleton.Button active size="large" shape="round" block />
                <Skeleton.Button active size="large" shape="round" block />
              </div>
            </div>
          ))}

          {/* Pagination skeleton */}
          <div className="flex flex-col bg-white rounded-lg px-4 py-2 w-full shadow-xl mt-8">
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonGroup;
