'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const User: FC<Props> = ({}: Props) => {
  return <div className={style['user-component']}></div>;
};
