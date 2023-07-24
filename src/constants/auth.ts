export const LOGIN_STATUS = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  CONFIRM: 'confirm',
  NEW_PASSWORD: 'newPassword',
} as const;

export type LoginStatus = (typeof LOGIN_STATUS)[keyof typeof LOGIN_STATUS];
