import { NextPage } from 'next';
import React from 'react';

import { SignUpConfirm } from '@/components/pages/account/signup/SignUpConfirm';

const SignUpConfirmPage: NextPage = () => {
  return (
    <SignUpConfirm
      signUpFormValues={{
        email: '',
        emailConfirm: '',
        firstName: '',
        firstNameKana: '',
        lastName: '',
        lastNameKana: '',
        password: '',
        passwordConfirm: '',
        telephone: '',
      }}
    />
  );
};

export default SignUpConfirmPage;
