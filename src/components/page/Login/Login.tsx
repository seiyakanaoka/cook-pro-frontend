'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { FormText } from '@/components/ui/form/FormText';
import { BUTTON_COLOR } from '@/constants/button';
import { PAGE_URL } from '@/constants/route';
import { LOGIN_FORM_VALUES } from '@/constants/validation/login';
import { useAuth } from '@/hooks/useAuth';
import { useFormText } from '@/hooks/useFormText';
import { LoginFormValues } from '@/types/login';

import style from './index.module.scss';

type Props = {};

export const Login: FC<Props> = ({}: Props) => {
  const { push } = useRouter();

  const { login } = useAuth();

  const { fieldValue, fieldState, onChange } = useFormText<LoginFormValues>({
    defaultValues: LOGIN_FORM_VALUES,
  });

  const handleLogin = async () => {
    const userName = fieldValue.userName || fieldValue.email || '';

    const password = fieldValue.password;

    await login(userName, password);

    push(PAGE_URL.HOME);
  };

  return (
    <div className={style['login-component']}>
      <h1 className={style['title']}>ログイン</h1>
      <div className={style['login-field']}>
        <FormText
          title="ユーザー名"
          value={fieldValue.userName ?? ''}
          errorMessage={fieldState.errors?.userName}
          onChange={(e) => onChange('userName', e)}
        />
        <FormText
          title="Email"
          value={fieldValue.email ?? ''}
          errorMessage={fieldState.errors?.email}
          onChange={(e) => onChange('email', e)}
        />
        <FormText
          title="パスワード"
          value={fieldValue.password}
          errorMessage={fieldState.errors?.password}
          onChange={(e) => onChange('password', e)}
        />
      </div>
      <Button
        text="ログイン"
        color={BUTTON_COLOR.primary}
        onClick={handleLogin}
        isDisabled={
          !fieldState.isValid || (!fieldValue.email && !fieldValue.userName)
        }
      />
    </div>
  );
};
