'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const Loading: FC<Props> = ({}: Props) => {
  return <div className={style['loading-component']}></div>;
};
