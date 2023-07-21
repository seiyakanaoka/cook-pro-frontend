import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { setCookie } from 'nookies';

import { ID_TOKEN_KEY } from '@/constants/cookie';

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '',
} as const;

type UseAuth = {
  login: (
    userName: string,
    password: string,
    successCallback: () => void
  ) => void;
};

export const useAuth = (): UseAuth => {
  const login = (
    userName: string,
    password: string,
    successCallback: () => void
  ): void => {
    const authenticationData = {
      Username: userName,
      Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userPool = new CognitoUserPool(poolData);

    const userData = {
      Username: userName,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const idToken = result.getIdToken().getJwtToken();
        setCookie(null, ID_TOKEN_KEY, idToken);
        successCallback();
      },
      onFailure: (error) => {
        alert('Authentication error');
        console.error('error : ', error);
      },
      newPasswordRequired: () => {
        // TODO: 再パスワード入力させる
      },
    });
  };

  return { login };
};
