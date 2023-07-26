import { LoginStatus } from '@/constants/auth';

export type LoginFormValues = {
  userName?: string;
  email?: string;
  password: string;
};

export type LoginResponse = {
  idToken?: string;
  status: LoginStatus;
};
