import { Dispatch, SetStateAction, createContext } from 'react';

type SnackbarContextType = {
  snackbarEvents: string[];
  setSnackbarEvents: Dispatch<SetStateAction<string[]>>;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  snackbarEvents: [],
  setSnackbarEvents: () => {},
});
