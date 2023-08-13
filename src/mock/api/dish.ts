import { rest } from 'msw';

import { DishesResponse } from '@/types/codegen/dish/DishesResponse';
import { DishesSearchResponse } from '@/types/codegen/dish/DishesSearchResponse';
import FoodImage from 'public/food-1.png';

const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const dishHandler = [
  rest.get(`${apiURL}/dish`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(DISHES_RESPONSE));
  }),
  rest.get(`${apiURL}/dish/search`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(DISHES_SEARCH_RESPONSE));
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
