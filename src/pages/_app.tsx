import '../assets/styles/globals.scss';

import { AppProps } from 'next/app';
import React from 'react';

import { AxiosWrapper } from '@/plugins/AxiosWrapper';
import { BaseErrorBoundary } from '@/plugins/BaseErrorBoundary';
import { SnackbarWrapper } from '@/plugins/SnackbarWrapper';
import { NextPageWithLayout } from '@/types/BuildIn';

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
