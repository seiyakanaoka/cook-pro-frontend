import clsx from 'clsx';
import { ChangeEventHandler, FC, useRef } from 'react';

import ClearIcon from '@/assets/icons/all-clear.svg';
import SearchIcon from '@/assets/icons/search.svg';
import { FORM_TEXT_FIELD_TYPE, FormTextFieldType } from '@/constants/form';

import style from './index.module.scss';

type Props = {
  value: string;
  type?: FormTextFieldType;
  placeholder?: string;
  onSearch: ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
};

export const FormSearch: FC<Props> = ({
  value,
  type = FORM_TEXT_FIELD_TYPE.TEXT,
  placeholder,
  onSearch,
  onClear,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div className={style['form-search-component']}>
      <div className={clsx(style['icon'], style['-search'])}>
        <SearchIcon />
      </div>
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        className={style['field']}
        value={value}
        onChange={onSearch}
      />
      <div
        className={clsx(style['icon'], style['-clear'])}
        onClick={handleClear}
      >
        <ClearIcon />
      </div>
    </div>
  );
};
