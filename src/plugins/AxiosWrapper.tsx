import { InternalAxiosRequestConfig } from 'axios';
import { parseCookies } from 'nookies';
import { FC, ReactNode } from 'react';

import { ID_TOKEN_KEY } from '@/constants/cookie';
import { axiosClient } from '@/utils/axios';

type Props = {
  children: ReactNode;
};

export const AxiosWrapper: FC<Props> = ({ children }: Props) => {
  const cookie = parseCookies();
  const idToken = cookie[ID_TOKEN_KEY];

  axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (typeof config.headers === 'undefined' || !idToken) return config;
    config.headers.Authorization = `Bearer ${idToken}`;
    return config;
  });

  return <>{children}</>;
};
