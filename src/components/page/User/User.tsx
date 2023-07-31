'use client';

import { FC } from 'react';

import { UserDetail } from '@/components/section/user/UserDetail';
import { useUser } from '@/hooks/api/user/useUser';

type Props = {};

export const User: FC<Props> = ({}: Props) => {
  const { userResponse } = useUser();

  return <UserDetail userResponse={userResponse} />;
};
