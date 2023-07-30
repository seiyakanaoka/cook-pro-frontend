'use client';

import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';

import { Footer } from '@/components/ui/Footer';
import { ID_TOKEN_KEY } from '@/constants/cookie';
import { PAGE_URL } from '@/constants/route';

import style from './layout.module.scss';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();

  const cookie = parseCookies();

  const hasToken = !!cookie[ID_TOKEN_KEY];

  useEffect(() => {
    if (!hasToken) {
      push(PAGE_URL.LOGIN);
    }
  }, [hasToken, push]);

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
