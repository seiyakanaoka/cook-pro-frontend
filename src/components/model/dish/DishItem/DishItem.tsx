'use client';

import { FC } from 'react';

import { DishTime } from '../DishTime';

import style from './index.module.scss';

type Props = { image: string; title: string; time: string };

export const DishItem: FC<Props> = ({ image, title, time }: Props) => {
  return (
    <div className={style['dish-component']}>
      <div className={style['image-field']}>
        <img src={image} alt="" className={style['image']} />
        <div className={style['time']}>
          <DishTime time={time} />
        </div>
      </div>
      <p className={style['title']}>{title}</p>
    </div>
  );
};