import { FC } from 'react';

import { DishDetailResponse } from '@/types/codegen/dish/DishDetailResponse';
import { MaterialResponse } from '@/types/codegen/material/MaterialResponse';

import style from './index.module.scss';

type Props = {
  dishDetailResponse: DishDetailResponse | undefined;
  dishMaterialResponse: MaterialResponse[];
};

export const DishEdit: FC<Props> = ({}: Props) => {
  return <div className={style['dish-edit-component']}></div>;
};
