'use client';

import { FC } from 'react';

import { BUTTON_COLOR } from '@/constants/button';

import { Button } from '../../Button';
import { FormCheckbox } from '../../form/FormCheckbox';

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
    <div className={style['filter-panel-component']} onClick={onClose}>
      <div
        className={style['panel-field']}
        onClick={(e) => e.stopPropagation()}
      >
        <p className={style['title']}>カテゴリフィルター</p>
        <div className={style['body-content']}>
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
        </div>
        <Button text="閉じる" color={BUTTON_COLOR.green} onClick={onClose} />
      </div>
    </div>
  );
};
