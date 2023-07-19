'use client';

import clsx from 'clsx';
import { FC } from 'react';

import CheckIcon from '@/assets/icons/check.svg';

import style from './index.module.scss';

type Props = { isCheck: boolean; text: string };

export const FormCheckbox: FC<Props> = ({ isCheck, text }: Props) => {
  return (
    <div className={style['form-checkbox-component']}>
      <div className={clsx(style['icon'], isCheck && style['-checked'])}>
        <CheckIcon />
      </div>
      <p className={style['text']}>{text}</p>
    </div>
  );
};
