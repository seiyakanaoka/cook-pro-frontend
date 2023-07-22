export const LOGIN_STATUS = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  CONFIRM: 'confirm',
} as const;

export type LoginStatus = (typeof LOGIN_STATUS)[keyof typeof LOGIN_STATUS];
