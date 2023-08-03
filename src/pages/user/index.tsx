import { ReactElement } from 'react';

import { DefaultLayout } from '@/components/layout/default/defaultLayout';
import { User } from '@/components/page/User';

import { NextPageWithLayout } from '../_app';

const UserPage: NextPageWithLayout = () => {
  return <User />;
};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default UserPage;
