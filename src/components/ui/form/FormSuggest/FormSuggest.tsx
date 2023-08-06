import { ChangeEventHandler, FC } from 'react';

import { FORM_TEXT_FIELD_TYPE } from '@/constants/form';

import { FormSearch } from '../FormSearch';
import { FormSelectPlate } from '../formSelect/FormSelectPlate';

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
          <FormSelectPlate items={items} onClick={onClick} />
        </div>
      )}
    </div>
  );
};
