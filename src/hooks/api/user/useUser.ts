import { getUser as _getUser } from '@/api/user';
import { API_URL } from '@/constants/api/api';
import { UserResponse } from '@/types/codegen/user/UserResponse';

type UseUser = {
  getUser: () => Promise<UserResponse>;
};

export const useUser = (): UseUser => {
  const getUser = async (): Promise<UserResponse> => {
    const response = await _getUser(API_URL.USER.USER);
    return response;
  };

  return { getUser };
};
