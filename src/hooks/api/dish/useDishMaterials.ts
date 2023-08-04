import useSWR from 'swr';

import { getDishMaterials } from '@/api/dish';
import { API_URL } from '@/constants/api/api';
import { MaterialResponse } from '@/types/codegen/material/MaterialResponse';

type UseDishMaterials = {
  dishMaterialResponse: MaterialResponse[];
};

export const useDishMaterials = (
  dishId: string | undefined
): UseDishMaterials => {
  const { data: dishMaterialResponse } = useSWR(
    !!dishId ? API_URL.DISH.DISH.replace(':dishId', dishId) : null,
    getDishMaterials
  );

  return {
    dishMaterialResponse: dishMaterialResponse?.materials ?? [],
  };
};
