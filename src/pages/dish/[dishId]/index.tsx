import { ReactElement } from 'react';

import { DefaultLayout } from '@/components/layout/default/defaultLayout';
import { HasHeaderLayout } from '@/components/layout/hasHeader';
import { NextPageWithLayout } from '@/types/BuildIn';

const DishPage: NextPageWithLayout = () => {
  return <></>;
};

DishPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      <HasHeaderLayout>{page}</HasHeaderLayout>
    </DefaultLayout>
  );
};

export default DishPage;
