import { useRouter } from 'next/router';
import { FC } from 'react';

import { DishDetail } from '@/components/section/dish/DishDetail';
import { DishEdit } from '@/components/section/dish/DishEdit';
import { useDish } from '@/hooks/api/dish/useDish';
import { useDishMaterials } from '@/hooks/api/dish/useDishMaterials';

export const Dish: FC = () => {
  const { query } = useRouter();
  const dishId = query['dishId'] as string | undefined;
  const status = query['status'] as string | undefined;

  const { dishDetailResponse } = useDish(dishId ?? '');

  const { dishMaterialResponse } = useDishMaterials(dishId ?? '');

  return status === 'edit' ? (
    <DishEdit
      dishDetailResponse={dishDetailResponse}
      dishMaterialResponse={dishMaterialResponse}
    />
  ) : (
    <DishDetail
      dishDetailResponse={dishDetailResponse}
      dishMaterialResponse={dishMaterialResponse}
    />
  );
};
