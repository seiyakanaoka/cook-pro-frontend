import { postUser } from '@/api/user';
import { API_URL } from '@/constants/api/api';
import { UserSignUpRequest } from '@/types/codegen/UserSignUpRequest';

type UseUserRequest = {
  createUser: (
    requestBody: UserSignUpRequest,
    headers?: { Authorization: string }
  ) => Promise<void>;
};

export const useUserRequest = (): UseUserRequest => {
  const createUser = async (
    requestBody: UserSignUpRequest,
    headers?: { Authorization: string }
  ): Promise<void> => {
    await postUser(API_URL.USER.SIGN_UP, requestBody, headers);
  };

  return { createUser };
};
