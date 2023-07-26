import { DishesResponse } from '@/types/codegen/dish/DishesResponse';
import { DishesSearchResponse } from '@/types/codegen/dish/DishesSearchResponse';
import { axiosClient } from '@/utils/axios';

export const getDishes = async (
  url: string,
  params: { category: string[] }
): Promise<DishesResponse> => {
  const response = await axiosClient.get<DishesResponse>(url, { params });
  return response.data;
};

export const getDishesSearch = async (
  url: string,
  params: { dishName: string }
): Promise<DishesSearchResponse> => {
  const response = await axiosClient.get<DishesSearchResponse>(url, { params });
  return response.data;
};
