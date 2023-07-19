'use client';

import { ChangeEventHandler, useState } from 'react';

import { Header } from '@/components/ui/Header';
import FoodImage from 'public/food-1.png';

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
    <div>
      <Header
        userImage={FoodImage.src}
        value={searchValue}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      {children}
    </div>
  );
}
