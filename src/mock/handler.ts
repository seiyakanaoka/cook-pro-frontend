import { categoryHandler } from './api/category';
import { dishHandler } from './api/dish';
import { imageHandler } from './api/image';
import { userHandler } from './api/user';

export const handlers = [
  ...dishHandler,
  ...categoryHandler,
  ...userHandler,
  ...imageHandler,
];
