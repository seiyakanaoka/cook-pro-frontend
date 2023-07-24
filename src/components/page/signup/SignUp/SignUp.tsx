'use client';

import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { SignUpCode } from '@/components/section/signup/SignUpCode';
import { SignUpConfirm } from '@/components/section/signup/SignUpConfirm';
import { SignUpField } from '@/components/section/signup/SignUpField';
import { SIGN_UP_FORM_VALUES } from '@/constants/validation/signup';
import { useFormText } from '@/hooks/useFormText';
import { SignUpFormValues } from '@/types/signup';

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
