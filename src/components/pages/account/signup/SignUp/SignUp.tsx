'use client';

import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { SignUpConfirm } from '../SignUpConfirm';
import { SignUpField } from '../SignUpField';

import style from './index.module.scss';

type Props = {};

export const SignUp: FC<Props> = ({}: Props) => {
  const searchParams = useSearchParams();

  const search = searchParams?.get('status');
  return (
    <div className={style['sign-up']}>
      {!!search ? (
        <SignUpField />
      ) : (
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
      )}
    </div>
  );
};
