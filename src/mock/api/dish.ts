import { rest } from 'msw';

import { DishesResponse } from '@/types/codegen/dish/DishesResponse';

const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const dishHandler = [
  rest.get(`${apiURL}/dish`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(DISHES_RESPONSE));
  }),
];

const DISHES_RESPONSE: DishesResponse = {
  dishes: [
    {
      id: 'f59fa544-abfe-423d-a20c-2799eed2d601',
      name: '季節の野菜たっぷりのカレー',
      image: {
        id: 'f59fa544-abfe-423d-a20c-2799eed2d601',
        url: './public/food-1.png',
      },
      createRequiredTime: 20,
    },
  ],
};
