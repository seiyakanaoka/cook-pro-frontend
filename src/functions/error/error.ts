import { AxiosError } from 'axios';

import { ApiError } from '@/types/codegen/Error';

export const isAxiosError = (error: any): error is AxiosError => {
  return !!error.isAxiosError;
};

export const isApiError = (error: any): error is ApiError => {
  return (
    typeof error === 'object' &&
    typeof error.error === 'string' &&
    typeof error.message === 'string' &&
    typeof error.path === 'string' &&
    typeof error.status === 'number' &&
    typeof error.timestamp === 'string'
  );
};
