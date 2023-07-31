import { API_URL_CATEGORIES } from './category';
import { API_URL_DISH, API_URL_DISHES, API_URL_DISHES_SEARCH } from './dish';
import { API_URL_USER, API_URL_USER_SIGN_UP } from './user';

export const API_URL = {
  USER: {
    USER: API_URL_USER,
    SIGN_UP: API_URL_USER_SIGN_UP,
  },
  DISH: {
    DISHES: API_URL_DISHES,
    DISH: API_URL_DISH,
    DISHES_SEARCH: API_URL_DISHES_SEARCH,
  },
  CATEGORY: {
    CATEGORIES: API_URL_CATEGORIES,
  },
} as const;
