import {
  getDishes as _getDishes,
  getDishesSearch as _getDishesSearch,
} from '@/api/dish';
import { API_URL } from '@/constants/api/api';
import { DishesSearchParams } from '@/types/codegen/dish/DishesSearchParams';
import { DishResponse } from '@/types/codegen/dish/DishResponse';
import { DishSearchResponse } from '@/types/codegen/dish/DishSearchResponse';

type UseDishes = {
  getDishes: () => Promise<DishResponse[]>;
  getDishesSearch: () => Promise<DishSearchResponse[]>;
};

export const useDishes = (): UseDishes => {
  const getDishes = async (): Promise<DishResponse[]> => {
    const response = await _getDishes(API_URL.DISH.DISHES);
    return response.dishes;
  };

  const getDishesSearch = async (
    params?: DishesSearchParams
  ): Promise<DishSearchResponse[]> => {
    const response = await _getDishesSearch(API_URL.DISH.DISHES, params);
    return response.dishesSearch;
  };

  return {
    getDishes,
    getDishesSearch,
  };
};
