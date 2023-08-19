import { rest } from 'msw';

import { API_URL } from '@/constants/api/api';
import { UserResponse } from '@/types/codegen/user/UserResponse';
import FoodImage from 'public/food-1.png';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const userHandler = [
  rest.get(`${baseURL}${API_URL.USER.USER}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(USER_RESPONSE));
  }),
];

const USER_RESPONSE: UserResponse = {
  name: 'aaa',
  image: FoodImage.src,
  email: 'aaa',
  telNumber: 'aaaa',
  displayUserName: 'aaaaa',
};
