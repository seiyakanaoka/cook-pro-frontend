import { LoginStatus } from '@/constants/aws/cognito';

export type LoginFormValues = {
  userNameOrEmail: string;
  password: string;
};

export type LoginResponse = {
  idToken: string;
  status: LoginStatus;
};
