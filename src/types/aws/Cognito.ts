export type AttributeKeyValue = { [key: string]: string };

export type CognitoUserAttributeKeyValue<T extends AttributeKeyValue> = {
  [x in keyof T]: string;
};
