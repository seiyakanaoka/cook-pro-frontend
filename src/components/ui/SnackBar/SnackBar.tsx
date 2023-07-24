'use client';

import clsx from 'clsx';
import { FC, MouseEventHandler } from 'react';

import { SNACKBAR_STATUS, SnackbarStatus } from '@/constants/snackbar';

import style from './index.module.scss';

type Props = {
  text: string;
  status?: SnackbarStatus;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const Snackbar: FC<Props> = ({
  text,
  status = SNACKBAR_STATUS.NORMAL,
  onClick,
}: Props) => {
  return (
    <button
      className={clsx(style['snackbar-component'], style[`-${status}`])}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
