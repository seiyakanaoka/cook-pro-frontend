'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const DishDetail: FC<Props> = ({}: Props) => {
  return <div className={style['dish-detail-component']}></div>;
};
