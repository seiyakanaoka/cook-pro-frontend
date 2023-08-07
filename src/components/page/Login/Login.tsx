import { useRouter } from 'next/router';
import { FC, useContext } from 'react';

import { Button } from '@/components/ui/Button';
import { FormText } from '@/components/ui/form/FormText';
import { BUTTON_COLOR } from '@/constants/button';
import { FORM_TEXT_FIELD_TYPE } from '@/constants/form';
import { PAGE_URL } from '@/constants/route';
import { LOGIN_FORM_VALUES } from '@/constants/validation/login';
import { SnackbarContext } from '@/context/snackbarContext';
import { useCognito } from '@/hooks/aws/useCognito';
import { useFormText } from '@/hooks/useFormText';
import { LoginFormValues } from '@/types/login';

import style from './index.module.scss';

type Props = {};

export const Login: FC<Props> = ({}: Props) => {
  const { addSnackbar } = useContext(SnackbarContext);

  const { push } = useRouter();

  const { login } = useCognito();

  const { fieldValue, fieldState, onChange } = useFormText<LoginFormValues>({
    defaultValues: LOGIN_FORM_VALUES,
  });

  const handleLogin = async () => {
    const userName = fieldValue.userNameOrEmail || '';

    const password = fieldValue.password;

    await login(userName, password);

    push(PAGE_URL.HOME);

    addSnackbar('ログインしました');
  };

  return (
    <div className={style['login-component']}>
      <h1 className={style['title']}>ログイン</h1>
      <div className={style['login-field']}>
        <FormText
          title="ユーザー名 もしくは Email"
          value={fieldValue.userNameOrEmail}
          errorMessage={fieldState.errors?.userNameOrEmail}
          onChange={(e) => onChange('userNameOrEmail', e)}
        />
        <FormText
          title="パスワード"
          value={fieldValue.password}
          type={FORM_TEXT_FIELD_TYPE.PASSWORD}
          errorMessage={fieldState.errors?.password}
          onChange={(e) => onChange('password', e)}
        />
      </div>
      <Button
        text="ログイン"
        color={BUTTON_COLOR.PRIMARY}
        onClick={handleLogin}
        isDisabled={!fieldState.isValid}
      />
    </div>
  );
};
