import { DishesParams } from '@/types/codegen/dish/DishesParams';
import { DishesResponse } from '@/types/codegen/dish/DishesResponse';
import { DishesSearchParams } from '@/types/codegen/dish/DishesSearchParams';
import { DishesSearchResponse } from '@/types/codegen/dish/DishesSearchResponse';
import { axiosClient } from '@/utils/axios';

export const getDishes = async (
  url: string,
  params?: DishesParams
): Promise<DishesResponse> => {
  const response = await axiosClient.get<DishesResponse>(url, { params });
  return response.data;
};

export const getDishesSearch = async (
  url: string,
  params?: DishesSearchParams
): Promise<DishesSearchResponse> => {
  const response = await axiosClient.get<DishesSearchResponse>(url, { params });
  return response.data;
};
