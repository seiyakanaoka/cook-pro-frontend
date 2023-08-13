import { rest } from 'msw';

import { API_URL } from '@/constants/api/api';
import { CategoriesResponse } from '@/types/codegen/category/CategoriesResponse';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';

const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const categoryHandler = [
  rest.get(`${apiURL}/${API_URL.CATEGORY.CATEGORIES}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(CATEGORIES_RESPONSE));
  }),
];

const CATEGORIES_RESPONSE: CategoriesResponse = {
  categories: [
    CategoryResponse.JAPAN_FOOD,
    CategoryResponse.WESTERN_FOOD,
    CategoryResponse.CHINESE_FOOD,
    CategoryResponse.MEAT_DISH,
    CategoryResponse.FISH_DISH,
    CategoryResponse.NOODLE,
    CategoryResponse.RICE,
    CategoryResponse.SALAD,
    CategoryResponse.WITH_ALCOHOL,
  ],
};
