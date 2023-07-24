import { createContext } from 'react';

type SnackbarContextType = {
  snackbarEvents: string[];
  addSnackbar: (text: string) => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  snackbarEvents: [],
  addSnackbar: () => {},
});
