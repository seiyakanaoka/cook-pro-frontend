'use client';

import { ChangeEventHandler, FC, FocusEventHandler } from 'react';

import style from './index.module.scss';

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export const FormTextField: FC<Props> = ({
  value,
  onChange,
  onBlur,
}: Props) => {
  return (
    <input
      className={style['form-text-field-component']}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
