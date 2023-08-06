import { ReactElement } from 'react';

import { DefaultLayout } from '@/components/layout/default/defaultLayout';
import { HasHeaderLayout } from '@/components/layout/hasHeader';
import { Dish } from '@/components/page/dish/Dish';

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
