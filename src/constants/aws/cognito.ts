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

export const LOGOUT_STATUS = {
  SUCCESS: 'success',
  FAILURE: 'failure',
} as const;

export type LogoutStatus = (typeof LOGOUT_STATUS)[keyof typeof LOGOUT_STATUS];
