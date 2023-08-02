import {
  CognitoUser,
  CognitoUserPool,
  ICognitoUserPoolData,
  ICognitoUserData,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

import {
  LOGIN_STATUS,
  LOGOUT_STATUS,
  LogoutStatus,
  SIGN_UP_STATUS,
  SignUpStatus,
} from '@/constants/auth';
import {
  AttributeKeyValue,
  CognitoUserAttributeKeyValue,
} from '@/types/aws/Cognito';
import { LoginResponse } from '@/types/login';

const cognitoUserPoolData: ICognitoUserPoolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? '',
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '',
} as const;

const userPool = new CognitoUserPool(cognitoUserPoolData);

const createCognitoUser = (userName: string): CognitoUser => {
  const userData: ICognitoUserData = {
    Username: userName,
    Pool: userPool,
  };
  return new CognitoUser(userData);
};

const createAttributes = <T extends AttributeKeyValue>(
  attribute: CognitoUserAttributeKeyValue<T>
): CognitoUserAttribute[] => {
  const attributeKeys = Object.keys(attribute);
  return attributeKeys.map(
    (key) =>
      new CognitoUserAttribute({
        Name: key,
        Value: attribute[key],
      })
  );
};

type UseCognito<T extends AttributeKeyValue> = {
  signUp: (
    userName: string,
    password: string,
    attribute: CognitoUserAttributeKeyValue<T>
  ) => Promise<SignUpStatus>;
  login: (userName: string, password: string) => Promise<LoginResponse>;
  confirmUser: (userName: string, confirmationCode: string) => Promise<any>;
  logout: () => Promise<LogoutStatus>;
  updateCognitoUser: (
    userName: string,
    attribute: CognitoUserAttributeKeyValue<T>
  ) => Promise<string>;
};

/** AWS Cognitoと接続するHooks */
export const useCognito = <T extends AttributeKeyValue>(): UseCognito<T> => {
  /**
   * サインアップ
   * @param userName ユーザー名
   * @param password パスワード
   * @param attribute 登録するユーザーの属性
   * @returns サインアップステータス
   */
  const signUp = (
    userName: string,
    password: string,
    attribute: CognitoUserAttributeKeyValue<T>
  ): Promise<SignUpStatus> => {
    const attributes = createAttributes(attribute);

    return new Promise<SignUpStatus>((resolve, reject) =>
      userPool.signUp(userName, password, attributes, [], (err, result) => {
        if (err) {
          console.error('err : ', err);
          reject(SIGN_UP_STATUS.FAILURE);
          return;
        }
        const cognitoUser = result?.user;
        if (typeof cognitoUser == 'undefined') {
          console.error('user undefined : ', cognitoUser);
          reject(SIGN_UP_STATUS.FAILURE);
          return;
        }
        resolve(SIGN_UP_STATUS.SUCCESS);
      })
    );
  };

  /**
   * ログイン
   * @param userName ユーザー名
   * @param password パスワード
   * @returns ログインレスポンス
   */
  const login = (
    userName: string,
    password: string
  ): Promise<LoginResponse> => {
    const authenticationData = {
      Username: userName,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = createCognitoUser(userName);

    return new Promise<LoginResponse>((resolve, reject) =>
      cognitoUser.authenticateUser(authenticationDetails, {
        // 成功した場合の処理
        onSuccess: (result) => {
          const idToken = result.getIdToken().getJwtToken();
          const successResponse: LoginResponse = {
            idToken,
            status: LOGIN_STATUS.SUCCESS,
          };
          resolve(successResponse);
        },
        // 失敗した場合の処理
        onFailure: (err) => {
          // ユーザーが未検証の場合は、ログイン成功判定にする
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
        // 新しいパスワードを要求する場合の処理
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

  /**
   * ユーザー検証
   * @param userName
   * @param confirmationCode
   * @returns
   */
  const confirmUser = (
    userName: string,
    confirmationCode: string
  ): Promise<any> => {
    const cognitoUser = createCognitoUser(userName);

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

  /**
   * ログアウト
   * @returns ログアウトステータス
   */
  const logout = (): Promise<LogoutStatus> => {
    return new Promise<LogoutStatus>((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser == null) {
        reject(LOGOUT_STATUS.FAILURE);
        return;
      }
      cognitoUser.signOut();
      resolve(LOGOUT_STATUS.SUCCESS);
    });
  };

  /**
   * ユーザー情報の更新
   * @param userName ユーザー名
   * @param attribute 更新する属性
   * @returns
   */
  const updateCognitoUser = (
    userName: string,
    attribute: CognitoUserAttributeKeyValue<T>
  ): Promise<string> => {
    const attributes = createAttributes(attribute);
    const cognitoUser = createCognitoUser(userName);
    return new Promise((resolve, reject) => {
      cognitoUser.updateAttributes(attributes, (err, result) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
          reject(err);
          return;
        }
        typeof result !== 'undefined' && resolve(result);
      });
    });
  };

  return {
    signUp,
    login,
    confirmUser,
    logout,
    updateCognitoUser,
  };
};
