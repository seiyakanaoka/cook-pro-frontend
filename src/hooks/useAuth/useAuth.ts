import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { setCookie } from 'nookies';

import { ID_TOKEN_KEY } from '@/constants/cookie';

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '',
} as const;

type UseAuth = {
  signUp: (
    userName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) => Promise<void>;
  login: (userName: string, password: string) => Promise<boolean>;
};

export const useAuth = (): UseAuth => {
  const signUp = (
    userName: string,
    email: string,
    phoneNumber: string,
    password: string
  ): Promise<void> => {
    const userPool = new CognitoUserPool(poolData);

    const attributeList: CognitoUserAttribute[] = [];

    const nameData = {
      Name: 'name',
      Value: userName,
    };

    const emailData = {
      Name: 'email',
      Value: email,
    };

    const phoneNumberData = {
      Name: 'phone_number',
      Value: `+${phoneNumber}`,
    };

    const attributeName = new CognitoUserAttribute(nameData);
    const attributeEmail = new CognitoUserAttribute(emailData);
    const attributePhoneNumber = new CognitoUserAttribute(phoneNumberData);

    attributeList.push(attributeName);
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    return new Promise<void>((resolve, reject) =>
      userPool.signUp(userName, password, attributeList, [], (err, result) => {
        if (err) {
          console.error('err : ', err);
          reject(err);
          return;
        }
        const cognitoUser = result?.user;
        if (typeof cognitoUser === 'undefined') {
          console.error('user undefined : ', cognitoUser);
          reject(cognitoUser);
          return;
        }
        resolve();
      })
    );
  };

  const login = (userName: string, password: string): Promise<boolean> => {
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

    return new Promise<boolean>((resolve, reject) =>
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const idToken = result.getIdToken().getJwtToken();
          setCookie(null, ID_TOKEN_KEY, idToken);
          resolve(true);
        },
        onFailure: (err) => {
          console.error('err : ', err);
          reject(err);
        },
        newPasswordRequired: () => {
          reject(false);
          // TODO: 再パスワード入力させる
        },
      })
    );
  };

  return { signUp, login };
};
