import { ReactElement } from 'react';

import { DefaultLayout } from '@/components/layout/default';
import { HasHeaderLayout } from '@/components/layout/hasHeader';
import { NextPageWithLayout } from '@/types/BuildIn';

const DishNewPage: NextPageWithLayout = () => {
  return <></>;
};

DishNewPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      <HasHeaderLayout>{page}</HasHeaderLayout>
    </DefaultLayout>
  );
};

export default DishNewPage;
