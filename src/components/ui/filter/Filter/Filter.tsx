'use client';

import { FC } from 'react';

import FilterIcon from '@/assets/icons/filter.svg';

import style from './index.module.scss';

type Props = {
  // items: {
  //   text: string;
  //   isCheck: boolean;
  // }[];
  onClick: () => void;
};

export const Filter: FC<Props> = ({ onClick }: Props) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const onOpen = () => {
  //   setIsOpen(true);
  // };

  // const onClose = () => {
  //   setIsOpen(false);
  // };

  return (
    <div className={style['filter-component']}>
      <div className={style['field']} onClick={onClick}>
        <div className={style['icon']}>
          <FilterIcon />
        </div>
      </div>
      {/* {isOpen && (
        <div className={style['panel']}>
          <FilterPanel items={items} onClick={onClick} onClose={onClose} />
        </div>
      )} */}
    </div>
  );
};
