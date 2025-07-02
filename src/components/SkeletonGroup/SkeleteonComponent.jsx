import { Skeleton } from "antd";
import { useEffect, useState } from "react";

// Skeleton component that mimics the job listing layout
const SkeletonComponent = ({ isLoading, children, delay = 300 }) => {
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

const JobListSkeleton = () => {
  return (
    <div className="w-full bg-[#F8F8F8]">
      <div className="container flex justify-between gap-8">
        <div className="flex flex-col items-center justify-start w-full">
          <div className="flex flex-col bg-white rounded-lg lg:px-8 md:px-4 py-6 w-full mt-8 shadow-xl">
            <Skeleton active paragraph={{ rows: 4 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonComponent;
