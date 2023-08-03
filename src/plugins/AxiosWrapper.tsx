import { InternalAxiosRequestConfig } from 'axios';
import { parseCookies } from 'nookies';
import { FC, ReactNode, useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import { ID_TOKEN_KEY } from '@/constants/cookie';
import { axiosClient } from '@/utils/axios';

type Props = {
  children: ReactNode;
};

export const AxiosWrapper: FC<Props> = ({ children }: Props) => {
  const { showBoundary } = useErrorBoundary();

  const cookie = parseCookies();
  const idToken = cookie[ID_TOKEN_KEY];

  useEffect(() => {
    axiosClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (typeof config.headers === 'undefined' || !idToken) return config;
        config.headers.Authorization = `Bearer ${idToken}`;
        return config;
      }
    );

    axiosClient.interceptors.response.use(
      (response) => response,
      (error) => {
        showBoundary(error);
        // Promiseを拒否しないと、関数が再度実行されてもshowBoundaryに、2回目以降からshowBoundaryにerrorが送信されない
        return Promise.reject(error);
      }
    );
  });

  return <>{children}</>;
};
