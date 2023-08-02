import { ReactElement } from 'react';

import DefaultLayout from '@/components/layout/default/defaultLayout';
import { Home } from '@/components/page/Home';

import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => {
  return <Home />;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default HomePage;
