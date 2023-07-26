import { AxiosRequestConfig } from 'axios';

import { UserSignUpRequest } from '@/types/codegen/user/UserSignUpRequest';
import { axiosClient } from '@/utils/axios';

export const postUser = async (
  url: string,
  requestBody: UserSignUpRequest,
  config: AxiosRequestConfig
): Promise<void> => {
  await axiosClient.post(url, requestBody, config);
};
