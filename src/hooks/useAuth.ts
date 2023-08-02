import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { setCookie } from 'nookies';

import { LOGIN_STATUS, LOGOUT_STATUS, LogoutStatus } from '@/constants/auth';
import { ID_TOKEN_KEY } from '@/constants/cookie';
import { LoginResponse } from '@/types/login';

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
  login: (userName: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<LogoutStatus>;
  confirm: (userName: string, confirmationCode: string) => Promise<any>;
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

  const login = (
    userName: string,
    password: string
  ): Promise<LoginResponse> => {
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

    return new Promise<LoginResponse>((resolve, reject) =>
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const idToken = result.getIdToken().getJwtToken();
          setCookie(null, ID_TOKEN_KEY, idToken);
          const successResponse: LoginResponse = {
            idToken,
            status: LOGIN_STATUS.SUCCESS,
          };
          resolve(successResponse);
        },
        onFailure: (err) => {
          if (err.code === 'UserNotConfirmedException') {
            const confirmResponse: LoginResponse = {
              status: LOGIN_STATUS.CONFIRM,
            };
            resolve(confirmResponse);
            return;
          }
          console.error('err : ', err);
          const failureResponse: LoginResponse = {
            status: LOGIN_STATUS.FAILURE,
          };
          reject(failureResponse);
        },
        newPasswordRequired: () => {
          const passwordResponse: LoginResponse = {
            status: LOGIN_STATUS.NEW_PASSWORD,
          };
          // TODO: 新しいパスワードの処理を追加する
          resolve(passwordResponse);
        },
      })
    );
  };

  const logout = (): Promise<LogoutStatus> => {
    return new Promise<LogoutStatus>((resolve, reject) => {
      const userPool = new CognitoUserPool(poolData);
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser == null) {
        reject(LOGOUT_STATUS.FAILURE);
        return;
      }
      cognitoUser.signOut();
      resolve(LOGOUT_STATUS.SUCCESS);
    });
  };

  const confirm = (
    userName: string,
    confirmationCode: string
  ): Promise<any> => {
    const userPool = new CognitoUserPool(poolData);

    const userData = {
      Username: userName,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise<any>((resolve, reject) =>
      cognitoUser.confirmRegistration(
        confirmationCode,
        false,
        (err, result) => {
          if (err) {
            console.error('account err:', err);
            reject(err);
            return;
          }
          resolve(result);
        }
      )
    );
  };

  return { signUp, login, logout, confirm };
};
