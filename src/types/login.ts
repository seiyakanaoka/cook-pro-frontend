import { LoginStatus } from '@/constants/aws/cognito';

export type LoginFormValues = {
  userName?: string;
  email?: string;
  password: string;
};

export type LoginResponse = {
  idToken: string;
  status: LoginStatus;
};
