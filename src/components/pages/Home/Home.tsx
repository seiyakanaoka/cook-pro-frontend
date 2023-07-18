'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const Home: FC<Props> = ({}: Props) => {
  return <div className={style['home-component']}></div>;
};
