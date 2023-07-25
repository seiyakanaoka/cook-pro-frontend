import { InternalAxiosRequestConfig } from 'axios';
import { parseCookies } from 'nookies';

import { ID_TOKEN_KEY } from '@/constants/cookie';
import { axiosClient } from '@/utils/axios';

export const useAxiosConfig = () => {
  const cookie = parseCookies();
  const idToken = cookie[ID_TOKEN_KEY];

  axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (config.headers === undefined || !idToken) return config;
    config.headers.Authorization = `Bearer ${idToken}`;
    return config;
  });
};
