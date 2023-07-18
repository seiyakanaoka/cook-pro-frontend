'use client';

import { FC } from 'react';

import TimeIcon from '@/assets/icons/time.svg';

import style from './index.module.scss';

type Props = { time: string };

export const DishTime: FC<Props> = ({ time }: Props) => {
  return (
    <div className={style['dish-time-component']}>
      <div className={style['icon']}>
        <TimeIcon />
      </div>
      <p className={style['time']}>{time}分</p>
    </div>
  );
};
