'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const UserDetail: FC<Props> = ({}: Props) => {
  return <div className={style['user-detail-component']}></div>;
};
