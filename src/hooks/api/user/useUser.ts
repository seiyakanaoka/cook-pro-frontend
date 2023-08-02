import useSWR, { KeyedMutator } from 'swr';

import { getUser } from '@/api/user';
import { API_URL } from '@/constants/api/api';
import { UserResponse } from '@/types/codegen/user/UserResponse';

type UseUser = {
  userResponse: UserResponse | undefined;
  mutate: KeyedMutator<UserResponse>;
};

export const useUser = (): UseUser => {
  const { data: userResponse, mutate } = useSWR(API_URL.USER.USER, getUser);

  return { userResponse, mutate };
};
