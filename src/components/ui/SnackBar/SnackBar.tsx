'use client';

import { FC, MouseEventHandler } from 'react';

import style from './index.module.scss';

type Props = { text: string; onClick: MouseEventHandler<HTMLButtonElement> };

export const Snackbar: FC<Props> = ({ text, onClick }: Props) => {
  return (
    <button className={style['snackbar-component']} onClick={onClick}>
      {text}
    </button>
  );
};
