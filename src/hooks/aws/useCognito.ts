import {
  CognitoUser,
  CognitoUserPool,
  ICognitoUserPoolData,
  ICognitoUserData,
  ICognitoUserAttributeData,
} from 'amazon-cognito-identity-js';

type Attribute = { [key: string]: string };

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

const createAttributes = (attribute: {
  [key: string]: string;
}): ICognitoUserAttributeData[] => {
  const attributeKeys = Object.keys(attribute);
  return attributeKeys.map((key) => ({
    Name: key,
    Value: attribute[key],
  }));
};

type UseCognito = {
  updateCognitoUser: (
    userName: string,
    attribute: Attribute
  ) => Promise<string>;
};

export const useCognito = (): UseCognito => {
  const updateCognitoUser = (
    userName: string,
    attribute: Attribute
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
    updateCognitoUser,
  };
};
