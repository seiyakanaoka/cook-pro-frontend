import { rest } from 'msw';

import { API_URL } from '@/constants/api/api';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';
import { DishDetailResponse } from '@/types/codegen/dish/DishDetailResponse';
import { DishesResponse } from '@/types/codegen/dish/DishesResponse';
import { DishesSearchResponse } from '@/types/codegen/dish/DishesSearchResponse';
import FoodImage from 'public/food-1.png';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const dishHandler = [
  rest.get(`${baseURL}${API_URL.DISH.DISHES}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(DISHES_RESPONSE));
  }),
  rest.get(`${baseURL}${API_URL.DISH.DISHES_SEARCH}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(DISHES_SEARCH_RESPONSE));
  }),
  rest.get(`${baseURL}${API_URL.DISH.DISH}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(DISH_RESPONSE));
  }),
];

const DISHES_RESPONSE: DishesResponse = {
  dishes: [
    {
      id: 'f59fa544-abfe-423d-a20c-2799eed2d601',
      name: '季節の野菜たっぷりのカレー',
      image: {
        id: 'f59fa544-abfe-423d-a20c-2799eed2d601',
        url: FoodImage.src,
      },
      createRequiredTime: 20,
    },
    {
      id: 'f59fa544-abfe-423d-a20c-2799eed2d602',
      name: '季節の野菜たっぷりのカレー',
      image: {
        id: 'f59fa544-abfe-423d-a20c-2799eed2d601',
        url: FoodImage.src,
      },
      createRequiredTime: 20,
    },
  ],
};

const DISH_RESPONSE: DishDetailResponse = {
  id: 'f59fa544-abfe-423d-a20c-2799eed2d601',
  name: '季節の野菜たっぷりのカレー',
  images: [{ id: 'f59fa544-abfe-423d-a20c-2799eed2d601', url: FoodImage.src }],
  categories: [CategoryResponse.JAPAN_FOOD],
  createRequiredTime: 20,
  favoriteFlag: false,
};

const DISHES_SEARCH_RESPONSE: DishesSearchResponse = {
  dishesSearch: [
    {
      id: 'f59fa544-abfe-423d-a20c-2799eed2d601',
      name: '季節の野菜たっぷりのカレー',
    },
    {
      id: 'f59fa544-abfe-423d-a20c-2799eed2d602',
      name: '季節の野菜たっぷりのカレー',
    },
    {
      id: 'f59fa544-abfe-423d-a20c-2799eed2d603',
      name: '季節の野菜たっぷりのカレー',
    },
  ],
};
