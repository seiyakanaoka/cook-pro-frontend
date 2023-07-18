'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = { image: string; title: string };

export const DishItem: FC<Props> = ({ image, title }: Props) => {
  return (
    <div className={style['dish-component']}>
      <img src={image} alt="" />
      <p>{title}</p>
    </div>
  );
};
