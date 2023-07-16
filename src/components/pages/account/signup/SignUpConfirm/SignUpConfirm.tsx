'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { FormResult } from '@/components/ui/form/FormResult';
import { SignUpFormValues } from '@/types/signup';

import style from './index.module.scss';

type Props = {
  signUpFormValues: SignUpFormValues;
};

export const SignUpConfirm: FC<Props> = ({ signUpFormValues }: Props) => {
  const { push, back } = useRouter();

  const handleRegister = async () => {
    push('/');
  };

  return (
    <div className={style['sign-up-confirm']}>
      <h1 className={style['title']}>新規登録入力確認</h1>
      <div className={style['sign-up-confirm-field']}>
        <FormResult title="姓" result={signUpFormValues.lastName} />
        <FormResult title="名" result={signUpFormValues.firstName} />
        <FormResult title="姓カナ" result={signUpFormValues.lastNameKana} />
        <FormResult title="名カナ" result={signUpFormValues.firstNameKana} />
        <FormResult title="Email" result={signUpFormValues.email} />
        <FormResult title="パスワード" result={signUpFormValues.password} />
        <FormResult title="電話番号" result={signUpFormValues.telephone} />
      </div>
      <div className={style['actions']}>
        <Button text="登録" color="primary" onClick={handleRegister} />
        <Button text="戻る" color="secondary" onClick={back} />
      </div>
    </div>
  );
};
