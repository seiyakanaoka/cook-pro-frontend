'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const DishTime: FC<Props> = ({}: Props) => {
  return <div className={style['dish-time-component']}></div>;
};
