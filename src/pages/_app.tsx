import '../assets/styles/globals.scss';

import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';

import { AxiosWrapper } from '@/plugins/AxiosWrapper';
import { BaseErrorBoundary } from '@/plugins/BaseErrorBoundary';
import { SnackbarWrapper } from '@/plugins/SnackbarWrapper';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SnackbarWrapper>
      <BaseErrorBoundary>
        <AxiosWrapper>{getLayout(<Component {...pageProps} />)}</AxiosWrapper>
      </BaseErrorBoundary>
    </SnackbarWrapper>
  );
}

export default MyApp;
