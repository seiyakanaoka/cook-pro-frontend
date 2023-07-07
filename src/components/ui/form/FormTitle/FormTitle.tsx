'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {
  title: string;
  isRequired?: boolean;
};

export const FormTitle: FC<Props> = ({ title, isRequired }: Props) => {
  return (
    <div className={style['form-title-component']}>
      {title}
      <div className={style['icon']}></div>
    </div>
  );
};
