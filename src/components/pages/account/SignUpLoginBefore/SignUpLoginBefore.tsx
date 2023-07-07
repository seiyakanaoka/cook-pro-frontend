'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

import style from './index.module.scss';

export const SignUpLoginBefore: FC = () => {
  const { push } = useRouter();

  const navigateToLogin = () => {
    push('/login');
  };

  const navigateToSignUp = () => {
    push('/signup');
  };

  return (
    <div className={style['signup-login-before']}>
      <div className={style['top']}>
        <div className={style['logo']}>
          <Logo />
        </div>
      </div>
      <div className={style['bottom']}>
        <div className={style['account-actions']}>
          <Button text="ログイン" color="primary" onClick={navigateToLogin} />
          <div className={style['guide']}>
            <div className={style['line']} />
            <p className={style['text']}>または</p>
            <div className={style['line']} />
          </div>
          <Button
            text="新規登録"
            color="secondary"
            onClick={navigateToSignUp}
          />
        </div>
        <p className={style['copyright']}>©️ Cook Pro 2023</p>
      </div>
    </div>
  );
};
