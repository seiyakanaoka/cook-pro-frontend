'use client';

import { FC } from 'react';

import LogoIcon from '@/assets/icons/logo.svg';

import style from './index.module.scss';

type Props = {};

export const Logo: FC<Props> = ({}: Props) => {
  return (
    <div className={style['logo-component']}>
      <LogoIcon />
    </div>
  );
};
