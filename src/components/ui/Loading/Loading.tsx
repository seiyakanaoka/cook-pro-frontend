'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const Loading: FC<Props> = ({}: Props) => {
  return (
    <div className={style['loading-component']}>
      <div className={style['loading']}>
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>
    </div>
  );
};
