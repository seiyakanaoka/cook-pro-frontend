import { ReactElement } from 'react';

import { DefaultLayout } from '@/components/layout/default/defaultLayout';
import { HasHeaderLayout } from '@/components/layout/hasHeader';
import { User } from '@/components/page/User';
import { NextPageWithLayout } from '@/types/BuildIn';

const UserPage: NextPageWithLayout = () => {
  return <User />;
};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      <HasHeaderLayout>{page}</HasHeaderLayout>
    </DefaultLayout>
  );
};

export default UserPage;
