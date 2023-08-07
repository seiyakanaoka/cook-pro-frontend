import { postDish } from '@/api/dish';
import { API_URL } from '@/constants/api/api';
import { PostDishRequest } from '@/types/codegen/dish/PostDishRequest';
import { PostDishResponse } from '@/types/codegen/dish/PostDishResponse';

type UseDishRequest = {
  createDish: (requestBody: PostDishRequest) => Promise<PostDishResponse>;
};

export const useDishRequest = (): UseDishRequest => {
  const createDish = async (requestBody: PostDishRequest) => {
    const response = await postDish(API_URL.DISH.POST_DISH, requestBody);
    return response;
  };

  return { createDish };
};
