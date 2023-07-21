'use client';

import clsx from 'clsx';
import { FC, useState } from 'react';

import HeartIcon from '@/assets/icons/heart.svg';
import HomeIcon from '@/assets/icons/home.svg';
import HumanIcon from '@/assets/icons/human.svg';

import style from './index.module.scss';

type Props = {};

export const Footer: FC<Props> = ({}: Props) => {
  const [select, setSelect] = useState<'home' | 'heart' | 'human'>();

  const selectedIcon = (item: 'home' | 'heart' | 'human') => {
    setSelect(item);
  };

  return (
    <div className={style['footer-component']}>
      <button
        onClick={() => selectedIcon('home')}
        className={clsx(style['icon'], select === 'home' && style['-selected'])}
      >
        <HomeIcon />
      </button>
      <button
        onClick={() => selectedIcon('heart')}
        className={clsx(
          style['icon'],
          select === 'heart' && style['-selected']
        )}
      >
        <HeartIcon />
      </button>
      <button
        onClick={() => selectedIcon('human')}
        className={clsx(
          style['icon'],
          select === 'human' && style['-selected']
        )}
      >
        <HumanIcon />
      </button>
    </div>
  );
};
