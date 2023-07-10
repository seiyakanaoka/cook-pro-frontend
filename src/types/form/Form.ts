export type Mode = 'onChange' | 'onBlur' | 'onSubmit';

export type Message = string;

export type FieldValue = {
  [x: string]: string;
};

export type FieldValueKey<T extends FieldValue> = keyof T;

export type FieldValueValidate = {
  required?: { value: boolean; message?: Message };
  maxLength?: { value: number; message?: Message };
  minLength?: { value: number; message?: Message };
  validate?: { value: () => void; message?: Message };
};

export type FieldState<T> = {
  errors: T | undefined;
  isValid: boolean;
};

export type UseFormTextArgs<T> = {
  mode?: Mode;
  defaultValues: T;
};
