import { categoryHandler } from './api/category';
import { dishHandler } from './api/dish';

export const handlers = [...dishHandler, ...categoryHandler];
