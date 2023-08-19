import { rest } from 'msw';

import { API_URL } from '@/constants/api/api';
import { GetImageResponse } from '@/types/codegen/image/GetImageResponse';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const imageHandler = [
  rest.post(`${baseURL}${API_URL.IMAGE.IMAGE_UPLOAD}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(IMAGE_RESPONSE));
  }),
];

const IMAGE_RESPONSE: GetImageResponse = {
  id: 'f59fa544-abfe-423d-a20c-2799eed2d602',
};
