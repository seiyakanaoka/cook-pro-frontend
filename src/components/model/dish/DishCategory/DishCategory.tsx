'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const DishCategory: FC<Props> = ({}: Props) => {
  return <div className={style['dish-category-component']}></div>;
};
