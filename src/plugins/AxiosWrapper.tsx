import { InternalAxiosRequestConfig } from 'axios';
import { parseCookies } from 'nookies';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { SWRConfig } from 'swr';

import { Loading } from '@/components/ui/Loading';
import { ID_TOKEN_KEY } from '@/constants/cookie';
import { axiosClient } from '@/utils/axios';

import style from './AxiosWrapper.module.scss';

type Props = {
  children: ReactNode;
};

export const AxiosWrapper: FC<Props> = ({ children }: Props) => {
  const { showBoundary } = useErrorBoundary();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cookie = parseCookies();
  const idToken = cookie[ID_TOKEN_KEY];

  const sendError = async (error: any) => {
    showBoundary(error);
    // Promiseを拒否しないと、関数が再度実行されてもshowBoundaryに、2回目以降からshowBoundaryにerrorが送信されない
    return Promise.reject(error);
  };

  useEffect(() => {
    axiosClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        setIsLoading(true);
        if (typeof config.headers === 'undefined' || !idToken) return config;
        config.headers.Authorization = `Bearer ${idToken}`;
        return config;
      }
    );

    axiosClient.interceptors.response.use((response) => {
      setIsLoading(false);
      return response;
    }, sendError);
  });

  console.log('isLoading : ', isLoading);

  if (isLoading) {
    <SWRConfig
      value={{
        onError: sendError,
      }}
    >
      <div className={style['loading-field']}>
        <Loading isBlurred />
      </div>
      {children}
    </SWRConfig>;
  }

  return (
    <SWRConfig
      value={{
        onError: sendError,
      }}
    >
      {children}
    </SWRConfig>
  );
};
