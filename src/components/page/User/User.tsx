'use client';

import { FC, useEffect, useState } from 'react';

import { UserDetail } from '@/components/section/user/UserDetail';
import { useUser } from '@/hooks/api/user/useUser';
import { UserResponse } from '@/types/codegen/user/UserResponse';

type Props = {};

export const User: FC<Props> = ({}: Props) => {
  const { getUser: _getUser } = useUser();

  const [user, setUser] = useState<UserResponse | undefined>();

  useEffect(() => {
    const getUser = async () => {
      const response = await _getUser();
      setUser(response);
    };

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <UserDetail user={user} />;
};
