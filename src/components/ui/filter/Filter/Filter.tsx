'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const Filter: FC<Props> = ({}: Props) => {
  return <div className={style['filter-component']}></div>;
};
