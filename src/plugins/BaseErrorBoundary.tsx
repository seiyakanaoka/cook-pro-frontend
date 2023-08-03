import { AxiosError } from 'axios';
import { FC, ReactNode, useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { SNACKBAR_STATUS } from '@/constants/snackbar';
import { SnackbarContext } from '@/context/snackbarContext';
import { ApiError } from '@/types/codegen/Error';

type Props = {
  children: ReactNode;
};
export const FallbackErrorBoundary: FC<Props> = ({ children }: Props) => {
  const { addSnackbar } = useContext(SnackbarContext);

  const isAxiosError = (error: any): error is AxiosError => {
    return !!error.isAxiosError;
  };

  const isApiError = (error: any): error is ApiError => {
    return (
      typeof error === 'object' &&
      typeof error.error === 'string' &&
      typeof error.message === 'string' &&
      typeof error.path === 'string' &&
      typeof error.status === 'number' &&
      typeof error.timestamp === 'string'
    );
  };

  const handleError = (error: Error, info: { componentStack: string }) => {
    console.log('通った');
    if (isAxiosError(error)) {
      const axiosError = error.response?.data;
      if (isApiError(axiosError)) {
        console.log('axiosError.message : ', axiosError.message);
        addSnackbar(axiosError.message, SNACKBAR_STATUS.ABNORMAL);
        return;
      }
      return;
    }
    console.log(error, info);
    addSnackbar('予期せぬエラーが発生しました', SNACKBAR_STATUS.ABNORMAL);
  };

  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <BaseErrorBoundary>{children}</BaseErrorBoundary>
      )}
      onError={handleError}
    >
      aaa
      {children}
    </ErrorBoundary>
  );
};

export const BaseErrorBoundary: FC<Props> = ({ children }: Props) => {
  const { addSnackbar } = useContext(SnackbarContext);

  const isAxiosError = (error: any): error is AxiosError => {
    return !!error.isAxiosError;
  };

  const isApiError = (error: any): error is ApiError => {
    return (
      typeof error === 'object' &&
      typeof error.error === 'string' &&
      typeof error.message === 'string' &&
      typeof error.path === 'string' &&
      typeof error.status === 'number' &&
      typeof error.timestamp === 'string'
    );
  };

  const handleError = (error: Error, info: { componentStack: string }) => {
    if (!isAxiosError(error)) {
      console.log(error, info);
      addSnackbar('予期せぬエラーが発生しました', SNACKBAR_STATUS.ABNORMAL);
      return;
    }

    const axiosError = error.response?.data;

    if (!isApiError(axiosError)) {
      console.log(error, info);
      addSnackbar('予期せぬエラーが発生しました', SNACKBAR_STATUS.ABNORMAL);
      return;
    }

    addSnackbar(axiosError.message, SNACKBAR_STATUS.ABNORMAL);
  };

  return (
    <ErrorBoundary FallbackComponent={() => children} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};
