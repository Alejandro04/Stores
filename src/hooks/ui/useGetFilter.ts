import { useEffect, useMemo, useState } from 'react';
import { fetchStores } from '../use-cases/useGetStore';

interface UseGetFilter {
  searchQuery: string;
  page: number;
  limit: number;
}

export const useGetFilter = ({ searchQuery, page, limit }: UseGetFilter) => {
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearchQuery(searchQuery);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, [searchQuery]);
  
    const memoizedSearchQuery = useMemo(() => debouncedSearchQuery, [debouncedSearchQuery]);
    const { data, isLoading, isError } = fetchStores(page, limit, memoizedSearchQuery)
  
    return {
      data,
      isLoading,
      isError,
    };
  };