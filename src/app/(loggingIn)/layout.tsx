'use client';

import { ChangeEventHandler, useState } from 'react';

import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';
import FoodImage from 'public/food-1.png';

import style from './layout.module.scss';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleClear = () => {
    setSearchValue('');
  };

  return (
    <div className={style['home-layout']}>
      <header className={style['header']}>
        <Header
          userImage={FoodImage.src}
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
