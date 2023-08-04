import { FC, ReactNode } from 'react';

import { Header } from '@/components/ui/Header';

import style from './index.module.scss';

type Props = {
  children: ReactNode;
};

export const HasHeaderLayout: FC<Props> = ({ children }: Props) => {
  return (
    <div className={style['has-header-layout']}>
      <div className={style['header']}>
        <Header />
      </div>
      <div className={style['main']}>{children}</div>
    </div>
  );
};
