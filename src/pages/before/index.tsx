import { ReactElement } from 'react';

import { AccountLayout } from '@/components/layout/account/accountLayout';
import { SignUpLoginBefore } from '@/components/page/signup/SignUpLoginBefore';

import { NextPageWithLayout } from '../_app';

const SignUpLoginBeforePage: NextPageWithLayout = () => {
  return <SignUpLoginBefore />;
};

SignUpLoginBeforePage.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default SignUpLoginBeforePage;
