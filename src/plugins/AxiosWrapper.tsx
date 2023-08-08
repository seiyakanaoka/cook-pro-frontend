import { InternalAxiosRequestConfig } from 'axios';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { SWRConfig } from 'swr';

import { Loading } from '@/components/ui/Loading';
import { axiosClient } from '@/utils/axios';
import { getIdToken } from '@/utils/cookie';

type Props = {
  children: ReactNode;
};

export const AxiosWrapper: FC<Props> = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { showBoundary } = useErrorBoundary();

  const sendError = async (error: any) => {
    showBoundary(error);
    // Promiseを拒否しないと、関数が再度実行されてもshowBoundaryに、2回目以降からshowBoundaryにerrorが送信されない
    return Promise.reject(error);
  };

  useEffect(() => {
    axiosClient.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        setIsLoading(true);
        const idToken = await getIdToken();
        config.headers.Authorization = `Bearer ${idToken}`;
        return config;
      }
    );

    axiosClient.interceptors.response.use((response) => {
      setIsLoading(false);
      return response;
    }, sendError);
  });

  console.log('isLoading: ', isLoading);

  return (
    <SWRConfig
      value={{
        onError: sendError,
      }}
    >
      {isLoading && <Loading isBlurred />}
      {children}
    </SWRConfig>
  );
};
