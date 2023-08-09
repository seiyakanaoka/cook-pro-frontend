import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { FormText } from '@/components/ui/form/FormText';
import { Loading } from '@/components/ui/Loading';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { addSnackbar } = useContext(SnackbarContext);

  const { push, back } = useRouter();

  const { login } = useCognito();

  const { fieldValue, fieldState, onChange } = useFormText<LoginFormValues>({
    defaultValues: LOGIN_FORM_VALUES,
  });

  const handleLogin = async () => {
    const userName = fieldValue.userNameOrEmail || '';

    const password = fieldValue.password;

    await login(userName, password);

    await push(PAGE_URL.HOME);

    addSnackbar('ログインしました');

    setIsLoading(false);
  };

  const handleClick = async () => {
    setIsLoading(true);
    await handleLogin();
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
      <div className={style['actions']}>
        <Button
          text="ログイン"
          color={BUTTON_COLOR.PRIMARY}
          onClick={handleClick}
          isDisabled={!fieldState.isValid}
        />
        <Button
          text="キャンセル"
          color={BUTTON_COLOR.SECONDARY}
          onClick={back}
        />
      </div>
      {isLoading && <Loading isBlurred />}
    </div>
  );
};
