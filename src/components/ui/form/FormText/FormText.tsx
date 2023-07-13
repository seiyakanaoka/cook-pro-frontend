'use client';

import { ChangeEventHandler, FC, FocusEventHandler } from 'react';

import { ErrorMessage } from '@/types/form';

import { FormTextField } from '../FormTextField';
import { FormTitle } from '../FormTitle';

import style from './index.module.scss';

type Props = {
  title: string;
  value: string;
  errorMessage?: ErrorMessage;
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
      {!!errorMessage?.required && (
        <p className={style['message']}>{errorMessage.required}</p>
      )}
      {!!errorMessage?.maxLength && (
        <p className={style['message']}>{errorMessage.maxLength}</p>
      )}
      {!!errorMessage?.minLength && (
        <p className={style['message']}>{errorMessage.minLength}</p>
      )}
      {!!errorMessage?.regex && (
        <p className={style['message']}>{errorMessage.regex}</p>
      )}
    </div>
  );
};
