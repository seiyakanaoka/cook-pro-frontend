export type Mode = 'onChange' | 'onBlur' | 'onSubmit';

export type Message = string;

export type ErrorMessage = {
  required?: Message | undefined;
  minLength?: Message | undefined;
  maxLength?: Message | undefined;
};

export type FieldErrors = { [x: string]: ErrorMessage };

export type FieldValues = {
  [x: string]: string;
};

export type FieldValueKey<T extends FieldValues> = keyof T;

export type FieldValueValidate = {
  required?: { value: boolean; message?: Message };
  maxLength?: { value: number; message?: Message };
  minLength?: { value: number; message?: Message };
  validate?: { value: () => void; message?: Message };
};

export type FieldState = {
  errors: FieldErrors | undefined;
  isValid: boolean;
};

export type UseFormTextArgs<T> = {
  mode?: Mode;
  defaultValues: T;
};
