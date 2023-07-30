import { AxiosRequestConfig } from 'axios';

import { UserResponse } from '@/types/codegen/user/UserResponse';
import { UserSignUpRequest } from '@/types/codegen/user/UserSignUpRequest';
import { axiosClient } from '@/utils/axios';

export const postUser = async (
  url: string,
  requestBody: UserSignUpRequest,
  config: AxiosRequestConfig
): Promise<void> => {
  await axiosClient.post(url, requestBody, config);
};

export const getUser = async (url: string): Promise<UserResponse> => {
  const response = await axiosClient.get(url);
  return response.data;
};
