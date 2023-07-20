'use client';

import clsx from 'clsx';
import { FC } from 'react';

import CheckIcon from '@/assets/icons/check.svg';

import style from './index.module.scss';

type Props = { isCheck: boolean; text: string; onClick: () => void };

export const FormCheckbox: FC<Props> = ({ isCheck, text, onClick }: Props) => {
  return (
    <div className={style['form-checkbox-component']} onClick={onClick}>
      <div className={clsx(style['icon'], isCheck && style['-checked'])}>
        <CheckIcon />
      </div>
      <p className={style['text']}>{text}</p>
    </div>
  );
};
