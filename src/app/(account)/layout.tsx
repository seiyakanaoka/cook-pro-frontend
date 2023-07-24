'use client';

import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';

import { Loading } from '@/components/ui/Loading';
import { ID_TOKEN_KEY } from '@/constants/cookie';
import { PAGE_URL } from '@/constants/route';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();

  const cookie = parseCookies();

  const hasToken = !!cookie[ID_TOKEN_KEY];

  useEffect(() => {
    if (hasToken) {
      push(PAGE_URL.HOME);
    }
  }, [hasToken, push]);

  if (hasToken) {
    return <Loading />;
  }

  return <>{children}</>;
}
