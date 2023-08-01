'use client';

import { ChangeEventHandler, FC, FocusEventHandler } from 'react';

import { FORM_TEXT_FIELD_TYPE, FormTextFieldType } from '@/constants/form';
import { ErrorMessage } from '@/types/Form';

import { FormTextField } from '../FormTextField';
import { FormTitle } from '../FormTitle';

import style from './index.module.scss';

type Props = {
  title: string;
  value: string;
  type?: FormTextFieldType;
  placeholder?: string;
  errorMessage?: ErrorMessage;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export const FormText: FC<Props> = ({
  title,
  value,
  type = FORM_TEXT_FIELD_TYPE.TEXT,
  placeholder = '入力してください',
  errorMessage,
  onChange,
  onBlur,
}: Props) => {
  return (
    <div className={style['form-text-component']}>
      <FormTitle title={title} />
      <FormTextField
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
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
