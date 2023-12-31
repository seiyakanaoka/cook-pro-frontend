import qs from 'qs';

import { DishDetailResponse } from '@/types/codegen/dish/DishDetailResponse';
import { DishesParams } from '@/types/codegen/dish/DishesParams';
import { DishesResponse } from '@/types/codegen/dish/DishesResponse';
import { DishesSearchParams } from '@/types/codegen/dish/DishesSearchParams';
import { DishesSearchResponse } from '@/types/codegen/dish/DishesSearchResponse';
import { DishMaterialResponse } from '@/types/codegen/dish/DishMaterialResponse';
import { PostDishRequest } from '@/types/codegen/dish/PostDishRequest';
import { PostDishResponse } from '@/types/codegen/dish/PostDishResponse';
import { PutDishRequest } from '@/types/codegen/dish/PutDishRequest';
import { PutDishResponse } from '@/types/codegen/dish/PutDishResponse';
import { axiosClient } from '@/utils/axios';

export const getDishes = async (
  url: string,
  params?: DishesParams
): Promise<DishesResponse> => {
  const response = await axiosClient.get<DishesResponse>(url, {
    params,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });
  return response.data;
};

export const postDish = async (
  url: string,
  requestBody: PostDishRequest
): Promise<PostDishResponse> => {
  const response = await axiosClient.post<PostDishResponse>(url, requestBody);
  return response.data;
};

export const getDishesSearch = async (
  url: string,
  params?: DishesSearchParams
): Promise<DishesSearchResponse> => {
  const response = await axiosClient.get<DishesSearchResponse>(url, { params });
  return response.data;
};

export const getDish = async (url: string): Promise<DishDetailResponse> => {
  const response = await axiosClient.get<DishDetailResponse>(url);
  return response.data;
};

export const putDish = async (
  url: string,
  requestBody: PutDishRequest
): Promise<PutDishResponse> => {
  const response = await axiosClient.put<PutDishResponse>(url, requestBody);
  return response.data;
};

export const deleteDish = async (url: string): Promise<void> => {
  await axiosClient.delete(url);
};

export const getDishMaterials = async (
  url: string
): Promise<DishMaterialResponse> => {
  const response = await axiosClient.get<DishMaterialResponse>(url);
  return response.data;
};
