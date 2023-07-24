import { Dispatch, SetStateAction, createContext } from 'react';

type SnackbarContext = {
  snackbarEvents: string[];
  setSnackbarEvents: Dispatch<SetStateAction<string[]>>;
};

export const snackbarContext = createContext<SnackbarContext>({
  snackbarEvents: [],
  setSnackbarEvents: () => {},
});
