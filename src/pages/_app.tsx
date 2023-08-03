import '../assets/styles/globals.css';

import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React, { ReactElement, ReactNode, useState } from 'react';

import { HasHeaderLayout } from '@/components/layout/hasHeader';
import { SnackbarEvent } from '@/context/snackbarContext';
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
  const [snackbarEvents, setSnackbarEvents] = useState<SnackbarEvent[]>([]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <SnackbarWrapper
      snackbarEvents={snackbarEvents}
      setSnackbarEvents={setSnackbarEvents}
    >
      <BaseErrorBoundary>
        <AxiosWrapper>
          <HasHeaderLayout>
            <Component {...pageProps} />
          </HasHeaderLayout>
        </AxiosWrapper>
      </BaseErrorBoundary>
    </SnackbarWrapper>
  );
}

export default MyApp;
