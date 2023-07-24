export const SNACKBAR_STATUS = {
  NORMAL: 'normal',
  ABNORMAL: 'abnormal',
} as const;

export type SnackbarStatus =
  (typeof SNACKBAR_STATUS)[keyof typeof SNACKBAR_STATUS];
