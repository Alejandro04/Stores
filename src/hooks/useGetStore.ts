import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Store from '@/domain/stores/Store';

interface UseGetStoreOptions {
  searchQuery: string;
  page: number;
  limit: number;
}

export const useGetStore = ({ searchQuery, page, limit }: UseGetStoreOptions) => {
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearchQuery(searchQuery);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, [searchQuery]);
  
    const memoizedSearchQuery = useMemo(() => debouncedSearchQuery, [debouncedSearchQuery]);
  
    const { data, isLoading, isError } = useQuery<Store[], Error>({
      queryKey: ['stores', page, limit, memoizedSearchQuery],
      queryFn: async () => {
        const response = await fetch(`/api/stores?search=${memoizedSearchQuery}&page=${page}&limit=${limit}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stores');
        }
        return response.json();
      },
    });
  
    return {
      data,
      isLoading,
      isError,
    };
  };