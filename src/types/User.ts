export type UserFormValues = {
  userImage?: string | undefined;
  nickname?: string | undefined;
  email?: string | undefined;
  telNumber?: string | undefined;
};

export type UserEditAttributeKeyValue = {
  email: string;
  phone_number: `+${string}`;
};
