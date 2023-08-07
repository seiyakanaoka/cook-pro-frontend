import { postDish, deleteDish as _deleteDish, putDish } from '@/api/dish';
import { API_URL } from '@/constants/api/api';
import { PostDishRequest } from '@/types/codegen/dish/PostDishRequest';
import { PostDishResponse } from '@/types/codegen/dish/PostDishResponse';
import { PutDishRequest } from '@/types/codegen/dish/PutDishRequest';
import { PutDishResponse } from '@/types/codegen/dish/PutDishResponse';

type UseDishRequest = {
  createDish: (requestBody: PostDishRequest) => Promise<PostDishResponse>;
  editDish: (
    dishId: string,
    requestBody: PutDishRequest
  ) => Promise<PutDishResponse>;
  deleteDish: (dishId: string) => Promise<void>;
};

export const useDishRequest = (): UseDishRequest => {
  const createDish = async (
    requestBody: PostDishRequest
  ): Promise<PostDishResponse> => {
    const response = await postDish(API_URL.DISH.POST_DISH, requestBody);
    return response;
  };

  const editDish = async (
    dishId: string,
    requestBody: PutDishRequest
  ): Promise<PutDishResponse> => {
    const response = await putDish(
      API_URL.DISH.PUT_DISH.replace(':dishId', dishId),
      requestBody
    );
    return response;
  };

  const deleteDish = async (dishId: string): Promise<void> => {
    await _deleteDish(API_URL.DISH.DISH.replace(':dishId', dishId));
  };

  return { createDish, editDish, deleteDish };
};
