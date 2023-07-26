import { API_URL_DISHES, API_URL_DISHES_SEARCH } from './dish';
import { API_URL_USER_SIGN_UP } from './user';

export const API_URL = {
  USER: {
    SIGN_UP: API_URL_USER_SIGN_UP,
  },
  DISH: {
    DISHES: API_URL_DISHES,
    DISHES_SEARCH: API_URL_DISHES_SEARCH,
  },
} as const;
