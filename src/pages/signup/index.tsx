import React, { ReactElement } from 'react';

import { AccountLayout } from '@/components/layout/account/accountLayout';
import { SignUp } from '@/components/page/signup/SignUp';
import { NextPageWithLayout } from '@/types/BuildIn';

const SignUpPage: NextPageWithLayout = () => {
  return <SignUp />;
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default SignUpPage;
