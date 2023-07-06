'use client';

import { clsx } from 'clsx';
import { FC } from 'react';

import { BUTTON_TYPE, ButtonColor, ButtonType } from '@/constants/button';

import style from './index.module.scss';

type Props = {
  text: string;
  color: ButtonColor;
  type?: ButtonType;
  isDisabled: boolean;
};

export const Button: FC<Props> = ({
  text,
  color,
  type = BUTTON_TYPE.button,
  isDisabled,
}: Props) => {
  return (
    <button
      className={clsx(style['button-component'], style[`-${color}`])}
      disabled={isDisabled}
      type={type}
    >
      {text}
    </button>
  );
};
