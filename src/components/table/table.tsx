import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useGetFilter } from '../../hooks/ui/useGetFilter';
import LoadingComponent from '../spinner/spinner';
import Error500Component from '../errors/500';
import Link from 'next/link';

const queryClient = new QueryClient()

type TableProps = {
  title: string;
  config: any;
  headers: any;
  createRoute: string;
}

const Table: React.FC<TableProps> = ({ title, config, headers, createRoute }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError } = useGetFilter({ searchQuery, page, limit });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  if (isLoading) {
    return <LoadingComponent/>
  }

  if (isError) {
    return <Error500Component/>
  }

  return (
    <>
      <section className="container px-4 mx-auto p-2">
        <h1 className="text-2xl font-bold text-gray-500 pb-4"> {title} </h1>
        <div className="relative" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <input type="text" value={searchQuery} onChange={handleSearch} className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" placeholder="search..." defaultValue="" />
          <svg className="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <div>
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

          <Link href={createRoute} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create
          </Link>
          </div>
        </div>
        <div className="flex flex-col pt-4">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      {Object.values(headers).map((field: any) => (
                        <th
                          key={field}
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          {field}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {data && data.map((store: any, index:any) => (
                      <tr key={store.id || index}>
                        {config.map((field: any) => (
                          <td
                            key={field.key}
                            className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                          >
                            {store[field.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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
      </section>
    </>
  );
};

const TableComponent: React.FC<TableProps> = ({ title, config, headers, createRoute }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Table title={title} config={config} headers={headers} createRoute={createRoute} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TableComponent;