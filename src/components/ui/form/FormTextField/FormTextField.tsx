'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const FormTextField: FC<Props> = ({}: Props) => {
  return <input className={style['form-text-field-component']} />;
};
