import { UserSignUpRequest } from '@/types/codegen/UserSignUpRequest';
import { axiosClient } from '@/utils/axios';

export const postUser = async (
  url: string,
  requestBody: UserSignUpRequest,
  headers?: { Authorization: string }
): Promise<void> => {
  await axiosClient.post(url, requestBody, { headers });
};
