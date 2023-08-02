import clsx from 'clsx';
import { FC } from 'react';

import { CATEGORY, CATEGORY_FOR_CSS } from '@/constants/category';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';

import style from './index.module.scss';

type Props = {
  category: CategoryResponse;
};

export const DishCategory: FC<Props> = ({ category }: Props) => {
  return (
    <div
      className={clsx(
        style['dish-category-component'],
        style[`-${CATEGORY_FOR_CSS[category]}`]
      )}
    >
      {CATEGORY[category]}
    </div>
  );
};
