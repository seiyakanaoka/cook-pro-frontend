'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const SnackBar: FC<Props> = ({}: Props) => {
  return <div className={style['snackbar-component']}></div>;
};