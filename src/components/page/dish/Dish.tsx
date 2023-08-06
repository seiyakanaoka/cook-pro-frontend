import { useRouter } from 'next/router';
import { FC } from 'react';

import { DishDetail } from '@/components/section/dish/DishDetail';
import { useDish } from '@/hooks/api/dish/useDish';
import { useDishMaterials } from '@/hooks/api/dish/useDishMaterials';

export const Dish: FC = () => {
  const { query } = useRouter();

  const dishId = query['dishId'] as string | undefined;

  const { dishDetailResponse } = useDish(dishId ?? '');

  const { dishMaterialResponse } = useDishMaterials(dishId ?? '');

  console.log('dishMaterialResponse : ', dishMaterialResponse);

  return (
    <DishDetail
      dishDetailResponse={dishDetailResponse}
      dishMaterialResponse={dishMaterialResponse}
    />
  );
};
