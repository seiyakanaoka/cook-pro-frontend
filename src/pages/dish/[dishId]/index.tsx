import { ReactElement } from 'react';

import DefaultLayout from '@/components/layout/default/defaultLayout';
import HasHeaderLayout from '@/components/layout/hasHeader/hasHeaderLayout';
import { Dish } from '@/components/page/Dish';

import { NextPageWithLayout } from '../../_app';

const DishPage: NextPageWithLayout = () => {
  return <Dish />;
};

DishPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      <HasHeaderLayout>{page}</HasHeaderLayout>
    </DefaultLayout>
  );
};

export default DishPage;