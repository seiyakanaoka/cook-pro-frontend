import { ReactElement } from 'react';

import { DefaultLayout } from '@/components/layout/default';
import { HasHeaderLayout } from '@/components/layout/hasHeader';
import { DishNew } from '@/components/page/Dish/DishNew';
import { NextPageWithLayout } from '@/pages/_app';

const DishNewPage: NextPageWithLayout = () => {
  return <DishNew />;
};

DishNewPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      <HasHeaderLayout>{page}</HasHeaderLayout>
    </DefaultLayout>
  );
};

export default DishNewPage;
