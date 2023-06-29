import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useGetStore } from '../../hooks/useGetStore';

const queryClient = new QueryClient()

const StoreList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
  
    const { data, isLoading, isError } = useGetStore({ searchQuery, page, limit });
  
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
      return <div>Loading...</div>;
    }
  
    if (isError) {
      return <div>Error occurred while fetching stores.</div>;
    }
  
    return (
      <div>
        <div>
          <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search..." />
          <select value={limit} onChange={(e) => handleLimitChange(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        {data && data.map((store, index) => (
          <div key={store.id || index}>
            <h3>name: {store.name}</h3>
            <p>Location: {store.description}</p>
          </div>
        ))}
        <div>
          <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
            Previous
          </button>
          <span>Page: {page}</span>
          <button onClick={() => handlePageChange(page + 1)}>Next</button>
        </div>
      </div>
    );
  };
  
  const App: React.FC = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <StoreList />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  };
  
  export default App;
  
  
  
  
  
