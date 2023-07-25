import { postUser } from '@/api/user';
import { UserSignUpRequest } from '@/types/codegen/UserSignUpRequest';

type UseUserRequest = {
  createUser: (requestBody: UserSignUpRequest) => Promise<void>;
};

export const useUserRequest = (): UseUserRequest => {
  const createUser = async (requestBody: UserSignUpRequest): Promise<void> => {
    await postUser('user/signup', requestBody);
  };

  return { createUser };
};
