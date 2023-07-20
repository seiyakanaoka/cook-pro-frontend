'use client';

import { FC } from 'react';

import { Button } from '../Button';
import { FormCheckbox } from '../form/FormCheckbox';

import style from './index.module.scss';

type Props = {
  items: {
    text: string;
    isCheck: boolean;
  }[];
  onClick: (id: string) => void;
  onClose: () => void;
};

export const FilterPanel: FC<Props> = ({ items, onClick, onClose }: Props) => {
  return (
    <div className={style['filter-panel-component']}>
      <div className={style['panel-field']}>
        <p className={style['title']}>カテゴリフィルター</p>
        <ul className={style['list']}>
          {items.map((item) => (
            <FormCheckbox
              key={item.text}
              text={item.text}
              isCheck={item.isCheck}
              onClick={() => onClick(item.text)}
            />
          ))}
        </ul>
        <div className={style['action']}>
          <Button text="閉じる" color="blue" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};
