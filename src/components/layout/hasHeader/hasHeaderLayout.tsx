import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

import { Header } from '@/components/ui/Header';
import { PAGE_URL } from '@/constants/route';

import style from './index.module.scss';

type Props = {
  children: ReactNode;
};

export const HasHeaderLayout: FC<Props> = ({ children }: Props) => {
  const { asPath } = useRouter();

  const isUserPage = asPath === PAGE_URL.USER;

  if (!isUserPage) {
    return <>{children}</>;
  }

  return (
    <div className={style['has-header-layout']}>
      <div className={style['header']}>
        <Header />
      </div>
      <div className={style['main']}>{children}</div>
    </div>
  );
};
