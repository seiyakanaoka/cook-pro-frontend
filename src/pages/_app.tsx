import '../assets/styles/globals.css';

import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';

import { useAxiosConfig } from '@/hooks/useAxiosConfig';
import { SnackbarWrapper } from '@/plugins/snackbarWrapper';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useAxiosConfig();

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <SnackbarWrapper>
      <Component {...pageProps} />
    </SnackbarWrapper>
  );
}

export default MyApp;
