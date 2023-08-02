'use client';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';

import { Button } from '@/components/ui/Button';
import { FormResult } from '@/components/ui/form/FormResult';
import { LOGIN_STATUS } from '@/constants/auth';
import { PAGE_URL } from '@/constants/route';
import { useCognito } from '@/hooks/aws/useCognito';
import { SignUpAttributeKeyValue, SignUpFormValues } from '@/types/signup';

import style from './index.module.scss';

type Props = {
  signUpFormValues: SignUpFormValues;
};

export const SignUpConfirm: FC<Props> = ({ signUpFormValues }: Props) => {
  const isSignUpFormValuesEmpty =
    Object.values(signUpFormValues).filter((value) => !!value).length === 0;

  const { push, back } = useRouter();

  const { signUp, login } = useCognito<SignUpAttributeKeyValue>();

  const handleRegister = async () => {
    const signUpAttributeKeyValue: SignUpAttributeKeyValue = {
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

    switch (loginStatus.status) {
      case LOGIN_STATUS.SUCCESS: {
        push(PAGE_URL.HOME);
        return;
      }
      case LOGIN_STATUS.CONFIRM: {
        push(`${PAGE_URL.SIGN_UP}?status=code`);
        return;
      }
      case LOGIN_STATUS.FAILURE: {
        // TODO: 仮のエラーハンドリング
        alert('入力内容が不正です。');
        push(PAGE_URL.SIGN_UP);
        return;
      }
    }
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
