import { ReactElement } from 'react';

import { DefaultLayout } from '@/components/layout/default';
import { HasHeaderLayout } from '@/components/layout/hasHeader';
import { DishNew } from '@/components/page/dish/DishNew';

const DishNewPage = () => {
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
