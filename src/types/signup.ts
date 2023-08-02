export type SignUpFormValues = {
  userName: string;
  email: string;
  password: string;
  telephone: string;
};

export type SignUpAttributeKeyValue = {
  name: string;
  email: string;
  phone_number: `+${string}`;
};
