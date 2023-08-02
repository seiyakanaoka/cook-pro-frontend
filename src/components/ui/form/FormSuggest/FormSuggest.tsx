import clsx from 'clsx';
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
  onClick: (id: string) => void;
};

export const FormSuggest: FC<Props> = ({
  items,
  value,
  placeholder = '入力してください',
  onSearch,
  onClear,
  onClick,
}: Props) => {
  const isEmpty = items.length === 0;

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
        <div className={clsx(style['panel'], isEmpty && style['-empty'])}>
          {isEmpty ? (
            <div className={style['message']}>結果がありません</div>
          ) : (
            <ul className={style['panel-list']}>
              {items.map((item) => (
                <li
                  key={item.id}
                  className={style['item']}
                  onClick={() => onClick(item.id)}
                >
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
