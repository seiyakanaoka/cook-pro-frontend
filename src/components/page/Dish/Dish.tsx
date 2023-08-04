import { useRouter } from 'next/router';
import { FC } from 'react';

import { DishDetail } from '@/components/section/dish/DishDetail';
import { useDish } from '@/hooks/api/dish/useDish';
import { DishMaterialResponse } from '@/types/codegen/dish/DishMaterialResponse';
import { MaterialResponse } from '@/types/codegen/material/MaterialResponse';

const dishMaterialResponse: DishMaterialResponse[] = [
  {
    materialId: '1',
    materialName: 'にんじん',
    quantity: 2,
    unit: MaterialResponse.UNIT,
  },
  {
    materialId: '2',
    materialName: '玉ねぎ',
    quantity: 2,
    unit: MaterialResponse.PIECE,
  },
  {
    materialId: '3',
    materialName: '白菜',
    quantity: 2,
    unit: MaterialResponse.BUNCH,
  },
  {
    materialId: '4',
    materialName: '塩',
    quantity: 2,
    unit: MaterialResponse.GRAMS,
  },
  {
    materialId: '5',
    materialName: 'ジャガイモ',
    quantity: 1,
    unit: MaterialResponse.PIECE,
  },
];

export const Dish: FC = () => {
  const { query } = useRouter();

  const dishId = query['dishId'] as string | undefined;

  const { dishDetailResponse } = useDish(dishId ?? '');

  return (
    <DishDetail
      dishDetailResponse={dishDetailResponse}
      dishMaterialResponse={dishMaterialResponse}
    />
  );
};
