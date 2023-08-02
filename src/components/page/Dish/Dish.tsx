import { useParams } from 'next/navigation';
import { FC } from 'react';

import { DishDetail } from '@/components/section/dish/DishDetail';
import { useDish } from '@/hooks/api/dish/useDish';

export const Dish: FC = () => {
  const params = useParams();

  const dishId = params?.dishId as string | null;

  const { dishDetailResponse } = useDish(dishId ?? '');

  return <DishDetail dishDetailResponse={dishDetailResponse} />;
};
