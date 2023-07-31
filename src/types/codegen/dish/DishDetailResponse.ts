import { CategoryResponse } from '../category/CategoryResponse';

import { DishImageResponse } from './DishImageResponse';

export interface DishDetailResponse {
  id: string;
  name: string;
  images: DishImageResponse[];
  categories: CategoryResponse[];
  createRequiredTime: number;
  favoriteFlag: boolean;
}
