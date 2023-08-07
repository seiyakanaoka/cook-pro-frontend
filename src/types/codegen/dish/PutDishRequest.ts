import { PostCategoryRequest } from '../category/PostCategoryRequest';
import { PostMaterialRequest } from '../material/PostMaterialRequest';

export interface PutDishRequest {
  dishName: string;
  createRequiredTime: number;
  imageIds: string[];
  materials: PostMaterialRequest[];
  category: PostCategoryRequest[];
}
