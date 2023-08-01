'use client';

import clsx from 'clsx';
import { useRouter, usePathname } from 'next/navigation';
import { FC } from 'react';

import HeartIcon from '@/assets/icons/heart.svg';
import HomeIcon from '@/assets/icons/home.svg';
import HumanIcon from '@/assets/icons/human.svg';
import { PAGE_URL } from '@/constants/route';

import style from './index.module.scss';

type Props = {};

export const Footer: FC<Props> = ({}: Props) => {
  const { push } = useRouter();

  const pathName = usePathname();

  const handleNavigation = (path: 'home' | 'favorite' | 'user') => {
    switch (path) {
      case 'home':
        push(PAGE_URL.HOME);
        return;
      case 'favorite':
        push(PAGE_URL.FAVORITE);
        return;
      case 'user':
        push(PAGE_URL.USER);
        return;
    }
  };

  return (
    <div className={style['footer-component']}>
      <button
        onClick={() => handleNavigation('home')}
        className={clsx(style['icon'], pathName === '/' && style['-selected'])}
      >
        <HomeIcon />
      </button>
      <button
        onClick={() => handleNavigation('favorite')}
        className={clsx(
          style['icon'],
          pathName === '/favorite' && style['-selected']
        )}
      >
        <HeartIcon />
      </button>
      <button
        onClick={() => handleNavigation('user')}
        className={clsx(
          style['icon'],
          pathName === '/user' && style['-selected']
        )}
      >
        <HumanIcon />
      </button>
    </div>
  );
};
