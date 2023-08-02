import { FC } from 'react';

import FilterIcon from '@/assets/icons/filter.svg';

import style from './index.module.scss';

type Props = {
  onClick: () => void;
};

export const FilterAction: FC<Props> = ({ onClick }: Props) => {
  return (
    <div className={style['filter-component']} onClick={onClick}>
      <div className={style['icon']}>
        <FilterIcon />
      </div>
    </div>
  );
};
