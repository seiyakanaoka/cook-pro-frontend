import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { PAGE_URL } from '@/constants/route';
import { getIdToken } from '@/utils/cookie';

type Props = {
  children: ReactNode;
};

export const AccountLayout = ({ children }: Props) => {
  const { push } = useRouter();

  useEffect(() => {
    const hasIdToken = async () => {
      const idToken = await getIdToken();

      if (!!idToken) {
        push(PAGE_URL.HOME);
      }
    };
    hasIdToken();
  }, [push]);

  return <>{children}</>;
};
