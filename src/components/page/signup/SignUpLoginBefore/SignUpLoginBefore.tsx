import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { CopyRight } from '@/components/ui/CopyRight';
import { Logo } from '@/components/ui/Logo';
import { BUTTON_COLOR } from '@/constants/button';
import { PAGE_URL } from '@/constants/route';

import style from './index.module.scss';

export const SignUpLoginBefore: FC = () => {
  const { push } = useRouter();

  const navigateToLogin = () => {
    push(PAGE_URL.LOGIN);
  };

  const navigateToSignUp = () => {
    push(PAGE_URL.SIGN_UP);
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
          <Button
            text="ログイン"
            color={BUTTON_COLOR.PRIMARY}
            onClick={navigateToLogin}
          />
          <div className={style['guide']}>
            <div className={style['line']} />
            <p className={style['text']}>または</p>
            <div className={style['line']} />
          </div>
          <Button
            text="新規登録"
            color={BUTTON_COLOR.SECONDARY}
            onClick={navigateToSignUp}
          />
        </div>
        <CopyRight />
      </div>
    </div>
  );
};
