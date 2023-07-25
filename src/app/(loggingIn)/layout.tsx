'use client';

import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { ChangeEventHandler, useEffect, useState } from 'react';

import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';
import { ID_TOKEN_KEY } from '@/constants/cookie';
import { PAGE_URL } from '@/constants/route';

import style from './layout.module.scss';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();

  const [searchValue, setSearchValue] = useState('');

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleClear = () => {
    setSearchValue('');
  };

  const cookie = parseCookies();

  const hasToken = !!cookie[ID_TOKEN_KEY];

  useEffect(() => {
    if (!hasToken) {
      push(PAGE_URL.LOGIN);
    }
  }, [hasToken, push]);

  return (
    <div className={style['home-layout']}>
      <header className={style['header']}>
        <Header
          value={searchValue}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </header>
      {children}
      <footer className={style['footer']}>
        <Footer />
      </footer>
    </div>
  );
}
