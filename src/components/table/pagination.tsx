import React from "react";

export default function Pagination({ page, setPage }: { page: any, setPage: any }) {

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex items-center justify-center pt-4 pb-8">
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-md mr-2"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>
      <span className="text-lg font-bold">Page: {page}</span>
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-md ml-2"
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
