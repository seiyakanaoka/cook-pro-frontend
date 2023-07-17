'use client';

import { ChangeEventHandler, FC, FocusEventHandler } from 'react';

import { FORM_TEXT_FIELD_TYPE, FormTextFieldType } from '@/constants/form';

import style from './index.module.scss';

type Props = {
  value: string;
  type?: FormTextFieldType;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export const FormTextField: FC<Props> = ({
  value,
  type = FORM_TEXT_FIELD_TYPE.TEXT,
  onChange,
  onBlur,
}: Props) => {
  return (
    <input
      type={type}
      className={style['form-text-field-component']}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
