import { parseCookies } from 'nookies';

import { ID_TOKEN_KEY } from '@/constants/cookie';

export const getIdToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cookie = parseCookies();
    const idToken = cookie[ID_TOKEN_KEY];
    if (!idToken) {
      reject('idTokenの取得に失敗しました');
      return;
    }
    resolve(idToken);
  });
};
