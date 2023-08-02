import { AxiosRequestConfig } from 'axios';

import { postUser, putUser } from '@/api/user';
import { API_URL } from '@/constants/api/api';
import { PutUserRequest } from '@/types/codegen/user/PutUserRequest';
import { UserSignUpRequest } from '@/types/codegen/user/UserSignUpRequest';

type UseUserRequest = {
  createUser: (
    requestBody: UserSignUpRequest,
    config: AxiosRequestConfig
  ) => Promise<void>;
  updateUser: (requestBody: PutUserRequest) => Promise<void>;
};

export const useUserRequest = (): UseUserRequest => {
  const createUser = async (
    requestBody: UserSignUpRequest,
    config: AxiosRequestConfig
  ): Promise<void> => {
    await postUser(API_URL.USER.SIGN_UP, requestBody, config);
  };

  const updateUser = async (requestBody: PutUserRequest): Promise<void> => {
    await putUser(API_URL.USER.USER, requestBody);
  };

  return { createUser, updateUser };
};
