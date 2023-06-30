import Store from '@/domain/stores/Store';
import { useQuery } from '@tanstack/react-query';

// infra
const fetchData = async (page: number, limit: number, memoizedSearchQuery: string): Promise<Store[]> => {
  const response = await fetch(`/api/stores?search=${memoizedSearchQuery}&page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch stores');
  }
  return response.json();
};

// use-case
export const fetchStores = (page: number, limit: number, memoizedSearchQuery: string) => {
  return useQuery<Store[], Error>({
    queryKey: ['stores', page, limit, memoizedSearchQuery],
    queryFn: () => fetchData(page, limit, memoizedSearchQuery),
  });
};
