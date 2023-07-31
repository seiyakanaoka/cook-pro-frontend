import useSWR from 'swr';

import { getCategories } from '@/api/category';
import { API_URL } from '@/constants/api/api';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';

type UseCategories = {
  categoriesResponse: CategoryResponse[];
};

export const useCategories = (): UseCategories => {
  const { data: categoriesResponse } = useSWR(
    API_URL.CATEGORY.CATEGORIES,
    getCategories
  );

  return { categoriesResponse: categoriesResponse?.categories ?? [] };
};
