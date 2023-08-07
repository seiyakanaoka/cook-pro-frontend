import clsx from 'clsx';
import { FC } from 'react';

import CheckIcon from '@/assets/icons/check.svg';
import { PullDownItem } from '@/types/PullDown';

import style from './index.module.scss';

type Props = {
  items: PullDownItem[];
  selectedItems?: PullDownItem[];
  onClick: (id: string) => void;
};

export const FormSelectPlate: FC<Props> = ({
  items,
  selectedItems,
  onClick,
}: Props) => {
  const isEmpty = items.length === 0;

  return (
    <div
      className={clsx(
        style['form-select-plate-component'],
        isEmpty && style['-empty']
      )}
      onClick={(e) => e.stopPropagation()}
    >
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
              {typeof selectedItems !== 'undefined' &&
                selectedItems.find(
                  (selectedItem) => selectedItem.id === item.id
                ) && (
                  <div className={style['icon']}>
                    <CheckIcon />
                  </div>
                )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
