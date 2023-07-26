import { AxiosRequestConfig } from 'axios';

import { postUser } from '@/api/user';
import { API_URL } from '@/constants/api/api';
import { UserSignUpRequest } from '@/types/codegen/UserSignUpRequest';

type UseUserRequest = {
  createUser: (
    requestBody: UserSignUpRequest,
    config: AxiosRequestConfig
  ) => Promise<void>;
};

export const useUserRequest = (): UseUserRequest => {
  const createUser = async (
    requestBody: UserSignUpRequest,
    config: AxiosRequestConfig
  ): Promise<void> => {
    await postUser(API_URL.USER.SIGN_UP, requestBody, config);
  };

  return { createUser };
};
