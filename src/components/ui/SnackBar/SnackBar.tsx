'use client';

import clsx from 'clsx';
import { FC, MouseEventHandler } from 'react';

import style from './index.module.scss';

const SNACKBAR_STATUS = {
  NORMAL: 'normal',
  ABNORMAL: 'abnormal',
} as const;

type SnackbarStatus = (typeof SNACKBAR_STATUS)[keyof typeof SNACKBAR_STATUS];

type Props = {
  text: string;
  color?: SnackbarStatus;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const Snackbar: FC<Props> = ({
  text,
  color = SNACKBAR_STATUS.NORMAL,
  onClick,
}: Props) => {
  return (
    <button
      className={clsx(style['snackbar-component'], style[`-${color}`])}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
