import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosResponse, AxiosError } from 'axios';

type InstagramResponseData = {
  data: {
    social_network_name: string;
    username: string;
    instagram_stats: {
      username: string;
    };
  };
  message: any;
  status: string;
};

type TikTokResponseData = {
  data: {
    social_network_name: string;
    username: string;
    tiktok_stats: {
      username: string;
    };
  };
  message: any;
  status: string;
};

type FacebookResponseData = {
  data: {
    social_network_name: string;
    username: string;
    facebook_stats: {
      username: string;
    };
  };
  message: any;
  status: string;
};

export function useGetCreatorSocialNetworkProfile<T>(
  socialNetwork: string,
  username: string,
  options: UseQueryOptions<AxiosResponse<T>, AxiosError, T, unknown[]> = {},
) {
  return useQuery({
    queryKey: ['use-get-creator-social-network-profile', socialNetwork, username],
    queryFn: async () => {
      return axios.get<T>(`/${socialNetwork}/${username}`);
    },
    ...options,
  });
}

export function InsightsInstagram() {
  const instagramQuery = useGetCreatorSocialNetworkProfile<InstagramResponseData>('instagram', 'lorem');
  return <div>{JSON.stringify(instagramQuery.data?.data?.instagram_stats)}</div>;
}

export function InsightsTiktok() {
  const tiktokQuery = useGetCreatorSocialNetworkProfile<TikTokResponseData>('tiktok', 'lorem');
  return <div>{JSON.stringify(tiktokQuery.data?.data?.tiktok_stats)}</div>;
}

export function InsightsFacebook() {
  const facebookQuery = useGetCreatorSocialNetworkProfile<FacebookResponseData>('facebook', 'lorem');
  return <div>{JSON.stringify(facebookQuery.data?.data?.facebook_stats)}</div>;
}