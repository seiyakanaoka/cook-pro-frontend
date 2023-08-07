import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FC } from 'react';

import AddIcon from '@/assets/icons/add.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import HomeIcon from '@/assets/icons/home.svg';
import HumanIcon from '@/assets/icons/human.svg';
import { PAGE_URL } from '@/constants/route';

import style from './index.module.scss';

type Props = {};

export const Footer: FC<Props> = ({}: Props) => {
  const { asPath, push } = useRouter();

  const handleNavigation = (
    path: 'home' | 'favorite' | 'user' | 'dish-new'
  ) => {
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
      case 'dish-new':
        push(PAGE_URL.DISH_NEW);
        return;
    }
  };

  return (
    <div className={style['footer-component']}>
      <button
        onClick={() => handleNavigation('home')}
        className={clsx(
          style['icon'],
          asPath === PAGE_URL.HOME && style['-selected']
        )}
      >
        <HomeIcon />
      </button>
      <button
        onClick={() => handleNavigation('dish-new')}
        className={clsx(
          style['icon'],
          asPath === PAGE_URL.DISH_NEW && style['-selected']
        )}
      >
        <AddIcon />
      </button>
      <button
        onClick={() => handleNavigation('favorite')}
        className={clsx(
          style['icon'],
          asPath === PAGE_URL.FAVORITE && style['-selected']
        )}
      >
        <HeartIcon />
      </button>
      <button
        onClick={() => handleNavigation('user')}
        className={clsx(
          style['icon'],
          asPath === PAGE_URL.USER && style['-selected']
        )}
      >
        <HumanIcon />
      </button>
    </div>
  );
};
