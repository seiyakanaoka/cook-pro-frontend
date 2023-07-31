import useSWR from 'swr';

import { getUser } from '@/api/user';
import { API_URL } from '@/constants/api/api';
import { UserResponse } from '@/types/codegen/user/UserResponse';

type UseUser = {
  userResponse: UserResponse | undefined;
};

export const useUser = (): UseUser => {
  const { data: userResponse } = useSWR(API_URL.USER.USER, getUser);

  return { userResponse };
};
