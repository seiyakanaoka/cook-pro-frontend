import { parseCookies } from 'nookies';

import { ID_TOKEN_KEY } from '@/constants/cookie';

export const getIdToken = (): Promise<string | undefined> => {
  return new Promise((resolve) => {
    const cookie = parseCookies();
    const idToken = cookie[ID_TOKEN_KEY];
    if (!idToken) {
      resolve(undefined);
      return;
    }
    resolve(idToken);
  });
};
