import {
  getDishes as _getDishes,
  getDishesSearch as _getDishesSearch,
} from '@/api/dish';
import { API_URL } from '@/constants/api/api';
import { DishesParams } from '@/types/codegen/dish/DishesParams';
import { DishesSearchParams } from '@/types/codegen/dish/DishesSearchParams';
import { DishResponse } from '@/types/codegen/dish/DishResponse';
import { DishSearchResponse } from '@/types/codegen/dish/DishSearchResponse';

type UseDishes = {
  getDishes: (params?: DishesParams) => Promise<DishResponse[]>;
  getDishesSearch: (
    params?: DishesSearchParams
  ) => Promise<DishSearchResponse[]>;
};

export const useDishes = (): UseDishes => {
  const getDishes = async (params?: DishesParams): Promise<DishResponse[]> => {
    const response = await _getDishes(API_URL.DISH.DISHES, params);
    return response.dishes;
  };

  const getDishesSearch = async (
    params?: DishesSearchParams
  ): Promise<DishSearchResponse[]> => {
    const response = await _getDishesSearch(API_URL.DISH.DISHES_SEARCH, params);
    return response.dishesSearch;
  };

  return {
    getDishes,
    getDishesSearch,
  };
};
