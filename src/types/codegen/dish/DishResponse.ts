import { DishImageResponse } from './DishImageResponse';

export interface DishResponse {
  dishId: string;
  dishName: string;
  image: DishImageResponse;
  dishCreateRequiredTime: number;
}
