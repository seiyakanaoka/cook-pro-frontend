'use client';

import { ChangeEventHandler, FC, FocusEventHandler } from 'react';

import { FormTextField } from '../FormTextField';
import { FormTitle } from '../FormTitle';

import style from './index.module.scss';

type Props = {
  title: string;
  value: string;
  errorMessage?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export const FormText: FC<Props> = ({
  title,
  value,
  errorMessage,
  onChange,
  onBlur,
}: Props) => {
  return (
    <div className={style['form-text-component']}>
      <FormTitle title={title} />
      <FormTextField value={value} onChange={onChange} onBlur={onBlur} />
      {!!errorMessage && <p className={style['message']}>{errorMessage}</p>}
    </div>
  );
};
