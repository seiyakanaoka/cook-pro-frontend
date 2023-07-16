'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const FormResult: FC<Props> = ({}: Props) => {
  return <div className={style['form-result']}></div>;
};
