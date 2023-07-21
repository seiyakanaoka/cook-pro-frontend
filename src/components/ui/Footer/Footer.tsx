'use client';

import { FC } from 'react';

import HeartIcon from '@/assets/icons/heart.svg';
import HomeIcon from '@/assets/icons/home.svg';
import HumanIcon from '@/assets/icons/human.svg';

import style from './index.module.scss';

type Props = {};

export const Footer: FC<Props> = ({}: Props) => {
  return (
    <div className={style['footer-component']}>
      <div className={style['icon']}>
        <HomeIcon />
      </div>
      <div className={style['icon']}>
        <HeartIcon />
      </div>
      <div className={style['icon']}>
        <HumanIcon />
      </div>
    </div>
  );
};
