'use client';

import { clsx } from 'clsx';
import { FC } from 'react';

import style from './index.module.scss';

type Props = {
  text: string;
  type: 'primary' | 'secondary';
  isDisabled: boolean;
};

export const Button: FC<Props> = ({ text, type, isDisabled }: Props) => {
  return (
    <button
      className={clsx(style['button-component'], style[`-${type}`])}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};
