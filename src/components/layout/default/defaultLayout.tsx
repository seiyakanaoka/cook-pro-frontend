import { ReactNode } from 'react';

import { Footer } from '@/components/ui/Footer';

import style from './index.module.scss';

type Props = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: Props) {
  // TODO: childrenの量が少ない時はスクロールさせないようにする
  return (
    <div className={style['home-layout']}>
      <div className={style['main']}>{children}</div>
      <footer className={style['footer']}>
        <Footer />
      </footer>
    </div>
  );
}
