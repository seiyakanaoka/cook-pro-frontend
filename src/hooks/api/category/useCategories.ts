import { getCategories as _getCategories } from '@/api/category';
import { API_URL } from '@/constants/api/api';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';

type UseCategories = {
  getCategories: () => Promise<CategoryResponse[]>;
};

export const useCategories = (): UseCategories => {
  const getCategories = async (): Promise<CategoryResponse[]> => {
    const response = await _getCategories(API_URL.CATEGORY.CATEGORIES);
    return response.categories;
  };

  return { getCategories };
};
