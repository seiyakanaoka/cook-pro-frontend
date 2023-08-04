import { ReactElement } from 'react';

import { DefaultLayout } from '@/components/layout/default/defaultLayout';
import { Dish } from '@/components/page/Dish';

import { NextPageWithLayout } from '../../_app';

const DishPage: NextPageWithLayout = () => {
  return <Dish />;
};

DishPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default DishPage;
