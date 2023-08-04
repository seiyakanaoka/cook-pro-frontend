import { useRouter } from 'next/router';
import { FC } from 'react';

import { DishDetail } from '@/components/section/dish/DishDetail';
import { useDish } from '@/hooks/api/dish/useDish';

export const Dish: FC = () => {
  const { query } = useRouter();

  const dishId = query['dishId'] as string | undefined;

  const { dishDetailResponse } = useDish(dishId ?? '');

  return <DishDetail dishDetailResponse={dishDetailResponse} />;
};
