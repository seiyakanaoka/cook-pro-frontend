'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const FormCheckbox: FC<Props> = ({}: Props) => {
  return <div className={style['form-checkbox-component']}></div>;
};
