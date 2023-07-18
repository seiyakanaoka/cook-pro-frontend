'use client';

import { FC } from 'react';

import TimeIcon from '@/assets/icons/time.svg';
import { HOUR_MINUTES } from '@/constants/date';
import { formatDate } from '@/utils/date';

import style from './index.module.scss';

type Props = { time: Date };

export const DishTime: FC<Props> = ({ time }: Props) => {
  return (
    <div className={style['dish-time-component']}>
      <div className={style['icon']}>
        <TimeIcon />
      </div>
      <p className={style['time']}>{formatDate(time, HOUR_MINUTES)}</p>
    </div>
  );
};
