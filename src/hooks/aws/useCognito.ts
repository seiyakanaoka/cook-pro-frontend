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
  updateUser: (userName: string, attribute: Attribute) => void;
};

export const useCognito = (): UseCognito => {
  const updateUser = (userName: string, attribute: Attribute): void => {
    const attributes = createAttributes(attribute);
    const cognitoUser = createCognitoUser(userName);
    cognitoUser.updateAttributes(attributes, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result: ' + result);
    });
  };

  return {
    updateUser,
  };
};
