'use client';

import clsx from 'clsx';
import { ChangeEventHandler, FC } from 'react';

import ClearIcon from '@/assets/icons/all-clear.svg';
import SearchIcon from '@/assets/icons/search.svg';
import { FORM_TEXT_FIELD_TYPE, FormTextFieldType } from '@/constants/form';

import style from './index.module.scss';

type Props = {
  value: string;
  type?: FormTextFieldType;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const FormSearch: FC<Props> = ({
  value,
  type = FORM_TEXT_FIELD_TYPE.TEXT,
  placeholder,
  onChange,
}: Props) => {
  return (
    <div className={style['form-search-component']}>
      <div className={clsx(style['icon'], style['-search'])}>
        <SearchIcon />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className={style['field']}
        value={value}
        onChange={onChange}
      />
      <div className={clsx(style['icon'], style['-clear'])}>
        <ClearIcon />
      </div>
    </div>
  );
};
