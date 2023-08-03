export const SIGN_UP_STATUS = {
  SUCCESS: 'success',
  FAILURE: 'failure',
} as const;

export type SignUpStatus = (typeof SIGN_UP_STATUS)[keyof typeof SIGN_UP_STATUS];

export const LOGIN_STATUS = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  CONFIRM: 'confirm',
  NEW_PASSWORD: 'newPassword',
} as const;

export type LoginStatus = (typeof LOGIN_STATUS)[keyof typeof LOGIN_STATUS];

export const COGNITO_SIGN_UP_MESSAGE = {
  message: 'サインアップできませんでした',
  options: { cause: { status: 'failure' } },
} as const;

export const COGNITO_LOGIN_MESSAGE = {
  message: 'ログインできませんでした',
  options: { cause: { status: 'failure' } },
} as const;

export const COGNITO_LOGOUT_MESSAGE = {
  message: 'ログアウトできませんでした',
  options: { cause: { status: 'failure' } },
} as const;

export const LOGOUT_RESPONSE = {
  SUCCESS: 'success',
  FAILURE: 'failure',
} as const;

export type LogoutResponse =
  (typeof LOGOUT_RESPONSE)[keyof typeof LOGOUT_RESPONSE];
