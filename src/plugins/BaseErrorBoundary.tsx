import { FC, ReactNode, useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { SNACKBAR_STATUS } from '@/constants/snackbar';
import { SnackbarContext } from '@/context/snackbarContext';

type Props = {
  children: ReactNode;
};

export const BaseErrorBoundary: FC<Props> = ({ children }: Props) => {
  const { addSnackbar } = useContext(SnackbarContext);

  const handleError = (error: Error, info: { componentStack: string }) => {
    console.log(error, info);
    addSnackbar('予期せぬエラーが発生しました', SNACKBAR_STATUS.ABNORMAL);
  };

  return (
    <ErrorBoundary FallbackComponent={() => children} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};
