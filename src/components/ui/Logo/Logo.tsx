'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {}

export const Logo: FC<Props> = ({}: Props) => {
  return (
    <div className={style['default']}></div>
  );
};