import { categoryHandler } from './api/category';
import { dishHandler } from './api/dish';
import { userHandler } from './api/user';

export const handlers = [...dishHandler, ...categoryHandler, ...userHandler];
