'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const Login: FC<Props> = ({}: Props) => {
  return <div className={style['login-component']}></div>;
};
