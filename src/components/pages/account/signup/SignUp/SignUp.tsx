'use client';

import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { SIGN_UP_FORM_VALUES } from '@/constants/validation/signup';
import { useFormText } from '@/hooks/useFormText';
import { SignUpFormValues } from '@/types/signup';

import { SignUpConfirm } from '../SignUpConfirm';
import { SignUpField } from '../SignUpField';

import style from './index.module.scss';

type Props = {};

export const SignUp: FC<Props> = ({}: Props) => {
  const searchParams = useSearchParams();

  const {
    fieldValue: signUpFormValues,
    fieldState,
    onChange,
  } = useFormText<SignUpFormValues>({
    defaultValues: SIGN_UP_FORM_VALUES,
  });

  const status = searchParams?.get('status');

  return (
    <div className={style['sign-up']}>
      {status !== 'confirm' ? (
        <SignUpField
          signUpFormValues={signUpFormValues}
          fieldState={fieldState}
          onChange={onChange}
        />
      ) : (
        <SignUpConfirm signUpFormValues={signUpFormValues} />
      )}
    </div>
  );
};
