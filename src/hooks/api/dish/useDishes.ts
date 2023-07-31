import { useState } from 'react';
import useSWR from 'swr';

import { getDishes, getDishesSearch } from '@/api/dish';
import { API_URL } from '@/constants/api/api';
import { DishesParams } from '@/types/codegen/dish/DishesParams';
import { DishesSearchParams } from '@/types/codegen/dish/DishesSearchParams';
import { DishResponse } from '@/types/codegen/dish/DishResponse';
import { DishSearchResponse } from '@/types/codegen/dish/DishSearchResponse';

type UseDishes = {
  dishesResponse: DishResponse[];
  dishesSearchResponse: DishSearchResponse[];
  dishesParams: DishesParams | undefined;
  dishesSearchParams: DishesSearchParams | undefined;
  onChangeDishesParams: (categories?: string[]) => void;
  onChangeDishesSearchParams: (dishName: string | undefined) => void;
};

export const useDishes = (): UseDishes => {
  const [dishesParams, setDishesParams] = useState<DishesParams | undefined>();

  const { data: dishesResponse } = useSWR(
    [API_URL.DISH.DISHES, dishesParams],
    ([url, params]) => getDishes(url, params)
  );

  const onChangeDishesParams = (categories?: string[]) => {
    setDishesParams({ categories });
  };

  const [dishesSearchParams, setDishesSearchParams] = useState<
    DishesSearchParams | undefined
  >({ dishName: '' });

  const onChangeDishesSearchParams = (dishName: string | undefined) => {
    setDishesSearchParams({ dishName });
  };

  const { data: dishesSearchResponse } = useSWR(
    [API_URL.DISH.DISHES_SEARCH, dishesSearchParams],
    ([url, params]) => getDishesSearch(url, params)
  );

  return {
    dishesResponse: dishesResponse?.dishes ?? [],
    dishesSearchResponse: dishesSearchResponse?.dishesSearch ?? [],
    dishesParams,
    dishesSearchParams,
    onChangeDishesParams,
    onChangeDishesSearchParams,
  };
};
