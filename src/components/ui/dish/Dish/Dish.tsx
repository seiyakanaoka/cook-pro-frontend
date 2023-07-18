'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const Dish: FC<Props> = ({}: Props) => {
  return <div className={style['dish-component']}></div>;
};
