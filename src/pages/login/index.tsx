import React, { ReactElement } from 'react';

import { AccountLayout } from '@/components/layout/account/accountLayout';
import { Login } from '@/components/page/Login';
import { NextPageWithLayout } from '@/pages/_app';

const LoginPage: NextPageWithLayout = () => {
  return <Login />;
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default LoginPage;
