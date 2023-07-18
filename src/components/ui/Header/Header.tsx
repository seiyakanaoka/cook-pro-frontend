'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const Header: FC<Props> = ({}: Props) => {
  return <div className={style['header-component']}></div>;
};
