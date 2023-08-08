import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { FormResult } from '@/components/ui/form/FormResult';
import { Loading } from '@/components/ui/Loading';
import { LOGIN_STATUS } from '@/constants/aws/cognito';
import { BUTTON_COLOR } from '@/constants/button';
import { PAGE_URL } from '@/constants/route';
import { useCognito } from '@/hooks/aws/useCognito';
import { SignUpAttributeKeyValue, SignUpFormValues } from '@/types/signup';

import style from './index.module.scss';

type Props = {
  signUpFormValues: SignUpFormValues;
};

export const SignUpConfirm: FC<Props> = ({ signUpFormValues }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const passwordMask = signUpFormValues.password.replace(/./g, '*');

  const isSignUpFormValuesEmpty =
    Object.values(signUpFormValues).filter((value) => !!value).length === 0;

  const { push, back } = useRouter();

  const { signUp, login } = useCognito<SignUpAttributeKeyValue>();

  const handleRegister = async () => {
    const signUpAttributeKeyValue: SignUpAttributeKeyValue = {
      name: signUpFormValues.userName,
      email: signUpFormValues.email,
      phone_number: `+${signUpFormValues.telephone}`,
    };

    await signUp(
      signUpFormValues.userName,
      signUpFormValues.password,
      signUpAttributeKeyValue
    );

    const loginStatus = await login(
      signUpFormValues.userName,
      signUpFormValues.password
    );

    setIsLoading(false);
    switch (loginStatus.status) {
      case LOGIN_STATUS.SUCCESS: {
        await push(PAGE_URL.HOME);
        return;
      }
      case LOGIN_STATUS.CONFIRM: {
        await push(`${PAGE_URL.SIGN_UP}?status=code`);
        return;
      }
      case LOGIN_STATUS.FAILURE: {
        // TODO: 仮のエラーハンドリング
        alert('入力内容が不正です。');
        await push(PAGE_URL.SIGN_UP);
        return;
      }
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    await handleRegister();
  };

  // 入力が空になっていた場合、新規登録画面にリダイレクトする（入力が空になるケースは以下）
  // - リロードした時
  // - 直遷移してきた時
  if (isSignUpFormValuesEmpty) {
    push('/signup');
  }

  // リロードイベントを検知して、入力内容の破棄を止める
  useEffect(() => {
    const onUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    // リロードイベントの設定
    addEventListener('beforeunload', onUnload);

    return () => {
      removeEventListener('beforeunload', onUnload);
    };
  }, [push]);

  return (
    <div className={style['sign-up-confirm']}>
      <h1 className={style['title']}>新規登録入力確認</h1>
      <div className={style['sign-up-confirm-field']}>
        <FormResult title="姓" result={signUpFormValues.userName} />
        <FormResult title="Email" result={signUpFormValues.email} />
        <FormResult title="パスワード" result={passwordMask} />
        <FormResult title="電話番号" result={signUpFormValues.telephone} />
      </div>
      <div className={style['actions']}>
        <Button
          text="登録"
          color={BUTTON_COLOR.PRIMARY}
          onClick={handleClick}
        />
        <Button text="戻る" color={BUTTON_COLOR.SECONDARY} onClick={back} />
      </div>
      {isLoading && <Loading isBlurred />}
    </div>
  );
};
