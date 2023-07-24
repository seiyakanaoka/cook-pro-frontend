export const PAGE_URL = {
  HOME: '/',
  BEFORE: '/before',
  FAVORITE: '/favorite',
  USER: '/user',
  LOGIN: '/login',
  SIGN_UP: '/signup',
} as const;

export const PAGE_QUERY = {
  SIGN_UP: {
    NAME: 'status=',
    VALUE: {
      CONFIRM: 'confirm',
      CODE: 'code',
    },
  },
} as const;
