'use client';

import { ChangeEventHandler, FC } from 'react';

import { FORM_TEXT_FIELD_TYPE } from '@/constants/form';

import { FormSearch } from '../FormSearch';

import style from './index.module.scss';

type Props = {
  items: { id: string; name: string }[];
  value: string;
  placeholder?: string;
  onSearch: ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
};

export const FormSuggest: FC<Props> = ({
  items,
  value,
  placeholder = '入力してください',
  onSearch,
  onClear,
}: Props) => {
  return (
    <div className={style['form-suggest-component']}>
      <FormSearch
        value={value}
        type={FORM_TEXT_FIELD_TYPE.TEXT}
        placeholder={placeholder}
        onSearch={onSearch}
        onClear={onClear}
      />
      {!!value && (
        <div className={style['panel']}>
          {!items.length ? (
            <div>結果がありません</div>
          ) : (
            <ul className={style['select-panel']}>
              {items.map((item) => (
                <li key={item.id} className={style['item']}>
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
