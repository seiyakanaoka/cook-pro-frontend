'use client';

import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { SIGN_UP_FORM_VALUES } from '@/constants/validation/signup';
import { useFormText } from '@/hooks/useFormText';
import { SignUpFormValues } from '@/types/signup';

import { SignUpCode } from '../../code/SignUpCode';
import { SignUpConfirm } from '../SignUpConfirm';
import { SignUpField } from '../SignUpField';

export const SignUp: FC = () => {
  const searchParams = useSearchParams();

  const {
    fieldValue: signUpFormValues,
    fieldState,
    onChange,
  } = useFormText<SignUpFormValues>({
    defaultValues: SIGN_UP_FORM_VALUES,
  });

  const status = searchParams?.get('status');

  if (status === 'confirm') {
    return <SignUpConfirm signUpFormValues={signUpFormValues} />;
  }

  if (status === 'code') {
    return <SignUpCode signUpFormValues={signUpFormValues} />;
  }

  return (
    <SignUpField
      signUpFormValues={signUpFormValues}
      fieldState={fieldState}
      onChange={onChange}
    />
  );
};
