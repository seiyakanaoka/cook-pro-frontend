import { postDish, deleteDish as _deleteDish } from '@/api/dish';
import { API_URL } from '@/constants/api/api';
import { PostDishRequest } from '@/types/codegen/dish/PostDishRequest';
import { PostDishResponse } from '@/types/codegen/dish/PostDishResponse';

type UseDishRequest = {
  createDish: (requestBody: PostDishRequest) => Promise<PostDishResponse>;
  deleteDish: (dishId: string) => Promise<void>;
};

export const useDishRequest = (): UseDishRequest => {
  const createDish = async (requestBody: PostDishRequest) => {
    const response = await postDish(API_URL.DISH.POST_DISH, requestBody);
    return response;
  };

  const deleteDish = async (dishId: string) => {
    await _deleteDish(API_URL.DISH.DISH.replace(':dishId', dishId));
  };

  return { createDish, deleteDish };
};
