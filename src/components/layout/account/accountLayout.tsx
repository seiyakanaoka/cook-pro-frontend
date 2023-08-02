import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { ReactNode, useEffect } from 'react';

import { ID_TOKEN_KEY } from '@/constants/cookie';
import { PAGE_URL } from '@/constants/route';

type Props = {
  children: ReactNode;
};

export const AccountLayout = ({ children }: Props) => {
  const { push } = useRouter();

  const cookie = parseCookies();

  const hasToken = !!cookie[ID_TOKEN_KEY];

  useEffect(() => {
    if (hasToken) {
      push(PAGE_URL.HOME);
    }
  }, [hasToken, push]);

  // if (hasToken) {
  //   return <Loading />;
  // }

  return <>{children}</>;
};
