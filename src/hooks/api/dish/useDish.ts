import useSWR from 'swr';

import { getDish } from '@/api/dish';
import { API_URL } from '@/constants/api/api';
import { DishDetailResponse } from '@/types/codegen/dish/DishDetailResponse';

type UseDish = {
  dishDetailResponse: DishDetailResponse | undefined;
};

export const useDish = (dishId: string): UseDish => {
  const { data: dishDetailResponse } = useSWR(
    API_URL.DISH.DISH.replace(':dishId', dishId),
    getDish
  );

  return {
    dishDetailResponse,
  };
};
