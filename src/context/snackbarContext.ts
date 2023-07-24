import { createContext, Ref } from 'react';

import { SnackbarStatus } from '@/constants/snackbar';

export type SnackbarEvent = {
  id: string;
  text: string;
  status: SnackbarStatus;
  ref: Ref<HTMLDivElement> | undefined;
};

export type SnackbarContextType = {
  snackbarEvents: SnackbarEvent[];
  addSnackbar: (text: string) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  snackbarEvents: [],
  addSnackbar: () => {},
});
