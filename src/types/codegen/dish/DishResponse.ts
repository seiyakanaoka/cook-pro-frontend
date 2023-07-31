import { DishImageResponse } from './DishImageResponse';

export interface DishResponse {
  id: string;
  name: string;
  image: DishImageResponse;
  createRequiredTime: number;
}
