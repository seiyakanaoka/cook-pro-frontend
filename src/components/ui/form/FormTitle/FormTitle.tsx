'use client';

import { FC } from 'react';

import RequiredIcon from '@/assets/icons/required.svg';

import style from './index.module.scss';

type Props = {
  title: string;
  isRequired?: boolean;
};

export const FormTitle: FC<Props> = ({ title, isRequired = true }: Props) => {
  return (
    <div className={style['form-title-component']}>
      {title}
      {isRequired && (
        <div className={style['icon']}>
          <RequiredIcon />
        </div>
      )}
    </div>
  );
};
