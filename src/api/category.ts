import { CategoriesResponse } from '@/types/codegen/category/CategoriesResponse';
import { axiosClient } from '@/utils/axios';

export const getCategories = async (
  url: string
): Promise<CategoriesResponse> => {
  const response = await axiosClient.get(url);
  return response.data;
};
