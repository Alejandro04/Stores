import React from "react";

export default function RowsPagePage({ limit, setLimit, setPage }: { limit: any, setLimit: any, setPage: any }) {

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <select
      value={limit}
      onChange={(e) => handleLimitChange(Number(e.target.value))}
      className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={50}>50</option>
    </select>
  );
}
