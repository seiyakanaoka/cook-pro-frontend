'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const FormSearch: FC<Props> = ({}: Props) => {
  return (
    <div className={style['form-search-component']}>
      <div className={style['icon']}></div>
      <input />
    </div>
  );
};
