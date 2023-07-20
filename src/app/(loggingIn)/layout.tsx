'use client';

import clsx from 'clsx';
import { ChangeEventHandler, useState } from 'react';

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
    <div
      className={clsx(
        style['home-layout'],
        matchMedia('(prefers-color-scheme: dark)').matches && style['-dark']
      )}
    >
      <header className={style['header']}>
        <Header
          userImage={FoodImage.src}
          value={searchValue}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </header>
      {children}
    </div>
  );
}
