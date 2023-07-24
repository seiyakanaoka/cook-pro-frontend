import { createContext, Ref } from 'react';

export type SnackbarEvent = {
  id: string;
  text: string;
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
