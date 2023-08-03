import { useRouter } from 'next/router';
import { FC, ReactNode, useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { PAGE_URL } from '@/constants/route';
import { SNACKBAR_STATUS } from '@/constants/snackbar';
import { SnackbarContext } from '@/context/snackbarContext';
import { isApiError, isAxiosError } from '@/functions/error/error';
import { ApiError } from '@/types/codegen/Error';

type Props = {
  children: ReactNode;
};

export const BaseErrorBoundary: FC<Props> = ({ children }: Props) => {
  const { push } = useRouter();

  const { addSnackbar } = useContext(SnackbarContext);

  /** HttpStatusごとに処理を変更する */
  const sendApiError = async (apiError: ApiError) => {
    const httpStatus = apiError.status;
    switch (httpStatus) {
      // 401エラーの場合
      case 401: {
        await push(PAGE_URL.LOGIN);
        addSnackbar(apiError.message, SNACKBAR_STATUS.ABNORMAL);
        return;
      }
    }
  };

  const handleError = async (
    error: Error,
    info: { componentStack: string }
  ) => {
    if (!!error.message) {
      console.log(error, info);
      addSnackbar(error.message, SNACKBAR_STATUS.ABNORMAL);
      return;
    }

    if (!isAxiosError(error)) {
      console.log(error, info);
      addSnackbar('予期せぬエラーが発生しました', SNACKBAR_STATUS.ABNORMAL);
      return;
    }

    const apiError = error.response?.data;

    if (!isApiError(apiError)) {
      console.log(error, info);
      addSnackbar('予期せぬエラーが発生しました', SNACKBAR_STATUS.ABNORMAL);
      return;
    }

    addSnackbar(apiError.message, SNACKBAR_STATUS.ABNORMAL);
    await sendApiError(apiError);
  };

  return (
    <ErrorBoundary FallbackComponent={() => children} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};
