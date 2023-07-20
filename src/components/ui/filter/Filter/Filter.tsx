'use client';

import { FC, useState } from 'react';

import { FilterPanel } from '../FilterPanel';

import style from './index.module.scss';

type Props = {
  items: {
    text: string;
    isCheck: boolean;
  }[];
  onClick: (id: string) => void;
};

export const Filter: FC<Props> = ({ items, onClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={style['filter-component']}>
      <div className={style['icon']} onClick={onOpen}></div>
      {isOpen && (
        <FilterPanel items={items} onClick={onClick} onClose={onClose} />
      )}
    </div>
  );
};
