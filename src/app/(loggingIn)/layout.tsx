'use client';

import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { ChangeEventHandler, useEffect, useState } from 'react';

import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';
import { Loading } from '@/components/ui/Loading';
import { ID_TOKEN_KEY } from '@/constants/cookie';

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
      push('/login');
    }
  }, [hasToken, push]);

  if (!hasToken) {
    return <Loading />;
  }

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
