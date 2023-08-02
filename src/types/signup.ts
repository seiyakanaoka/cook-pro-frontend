export type SignUpFormValues = {
  userName: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
  telephone: string;
};

export type SignUpAttributeKeyValue = {
  name: string;
  email: string;
  phone_number: `+${string}`;
};
