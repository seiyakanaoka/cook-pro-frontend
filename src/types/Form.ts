export type Mode = 'onChange' | 'onBlur' | 'onSubmit';

export type Message = string;

export type ErrorMessage = {
  required?: Message | undefined;
  minLength?: Message | undefined;
  maxLength?: Message | undefined;
  regex?: Message | undefined;
};

export type DefaultValues<T extends FieldValues> = {
  [x in keyof T]: { validate?: FieldValueValidate; value: string };
};

export type FieldErrors<T extends FieldValues> = {
  [x in keyof T]: ErrorMessage;
};

export type FieldValues = {
  [x: string]: string;
};

export type FieldValueKey<T extends FieldValues> = keyof T;

export type FieldValueValidate = {
  required?: { value: boolean; message?: Message };
  maxLength?: { value: number; message?: Message };
  minLength?: { value: number; message?: Message };
  validate?: { value: (x: string) => void; message?: Message };
  regex?: { value: RegExp; message?: Message };
};

export type FieldState<T extends FieldValues> = {
  errors: FieldErrors<T> | undefined;
  isValid: boolean;
};

export type UseFormTextArgs<T extends FieldValues> = {
  mode?: Mode;
  defaultValues: DefaultValues<T>;
};
