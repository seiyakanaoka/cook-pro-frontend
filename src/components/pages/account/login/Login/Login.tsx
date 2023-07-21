'use client';

import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { FormText } from '@/components/ui/form/FormText';
import { BUTTON_COLOR } from '@/constants/button';
import { ID_TOKEN_KEY } from '@/constants/cookie';
import { LOGIN_FORM_VALUES } from '@/constants/validation/login';
import { useFormText } from '@/hooks/useFormText';
import { LoginFormValues } from '@/types/login';

import style from './index.module.scss';

type Props = {};

export const Login: FC<Props> = ({}: Props) => {
  const { push } = useRouter();

  const { fieldValue, fieldState, onChange } = useFormText<LoginFormValues>({
    defaultValues: LOGIN_FORM_VALUES,
  });

  const handleLogin = () => {
    const poolData = {
      UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '', // CognitoのユーザープールIDに適切な値を設定
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '', // CognitoのクライアントIDに適切な値を設定
    };

    const authenticationData = {
      Username: fieldValue.userName || fieldValue.email || '',
      Password: fieldValue.password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      // Eメールも渡せる
      Username: fieldValue.userName || fieldValue.email || '',
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const idToken = result.getIdToken().getJwtToken();
        setCookie(null, ID_TOKEN_KEY, idToken);
        push('/');
      },
      onFailure: (error) => {
        alert('Authentication error');
        if (error.code === 'NewPasswordRequiredException') {
          console.error('New password required : ', error);
        } else {
          console.error('Authentication error : ', error);
        }
      },
    });
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
