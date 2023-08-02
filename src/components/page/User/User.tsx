import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { UserDetail } from '@/components/section/user/UserDetail';
import { UserEdit } from '@/components/section/user/UserEdit';
import { useUser } from '@/hooks/api/user/useUser';

type Props = {};

export const User: FC<Props> = ({}: Props) => {
  const { userResponse } = useUser();

  const params = useSearchParams();

  const status = params?.get('status');

  return status === 'edit' ? (
    <UserEdit userResponse={userResponse} />
  ) : (
    <UserDetail userResponse={userResponse} />
  );
};
