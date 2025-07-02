import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePages = 5; // Number of visible pages before/after the current page
  const pageNumbers = [];

  if (totalPages <= visiblePages + 4) {
    // Show all pages if total is small
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= visiblePages) {
      // Show first few pages and last page
      pageNumbers.push(
        ...Array.from({ length: visiblePages }, (_, i) => i + 1)
      );
      pageNumbers.push("...", totalPages);
    } else if (currentPage > totalPages - visiblePages) {
      // Show first page and last few pages
      pageNumbers.push(1, "...");
      pageNumbers.push(
        ...Array.from(
          { length: visiblePages },
          (_, i) => totalPages - visiblePages + i + 1
        )
      );
    } else {
      // Show first, current range, and last
      pageNumbers.push(1, "...");
      pageNumbers.push(
        ...Array.from(
          { length: visiblePages },
          (_, i) => currentPage - Math.floor(visiblePages / 2) + i
        )
      );
      pageNumbers.push("...", totalPages);
    }
  }

  return (
    <div className="flex items-center justify-center w-full gap-4 mt-8">
      {/* Previous Button */}
      <button
        className="px-3 py-1 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img
          src="/assets/images/dashboard/ep_arrow-left.png"
          alt="prev"
          className="w-4"
        />
      </button>

      {/* Jump to First Page */}
      {currentPage > visiblePages && (
        <button className="px-2" onClick={() => onPageChange(1)}>
          {"<<"}
        </button>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((number, index) =>
        number === "..." ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={number}
            className={`px-2 font-bold number ${
              currentPage === number ? "text-black" : "text-gray-500"
            }`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        )
      )}

      {/* Jump to Last Page */}
      {currentPage < totalPages - visiblePages && (
        <button className="px-2" onClick={() => onPageChange(totalPages)}>
          {">>"}
        </button>
      )}

      {/* Next Button */}
      <button
        className="px-3 py-1 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img
          src="/assets/images/dashboard/ep_arrow-right_black.png"
          alt="next"
          className="w-4"
        />
      </button>
    </div>
  );
};

export default Pagination;
