'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const Snackbar: FC<Props> = ({}: Props) => {
  return (
    <button className={style['snackbar-component']}>This is Snackbar</button>
  );
};
