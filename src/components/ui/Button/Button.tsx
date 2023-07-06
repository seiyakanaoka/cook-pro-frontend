'use client';

import { FC } from 'react';

import style from './index.module.scss';

type Props = {
  text: string;
  type: 'primary' | 'secondary';
};

export const Button: FC<Props> = ({ text, type }: Props) => {
  return (
    <button className={`${style['button-component']} ${style[`-${type}`]}`}>
      {text}
    </button>
  );
};
