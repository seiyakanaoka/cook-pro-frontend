import { DefaultValues, FieldValueValidate } from '@/types/form';
import { LoginFormValues } from '@/types/login';

export const LOGIN_VALIDATION: {
  USER_NAME: FieldValueValidate;
  EMAIL: FieldValueValidate;
  PASSWORD: FieldValueValidate;
} = {
  USER_NAME: {
    required: { value: false },
  },
  EMAIL: {
    required: { value: false },
  },
  PASSWORD: {
    required: { value: true, message: '入力してください。' },
    minLength: { value: 8, message: '8文字から30文字の間で入力してください。' },
    maxLength: { value: 30, message: '8文字から30文字の間で入力してください' },
    regex: {
      value: /^[a-zA-Z0-9]+$/,
      message: '半角英数字のみ入力できます。',
    },
  },
} as const;

export const SIGN_UP_FORM_VALUES: DefaultValues<LoginFormValues> = {
  userName: {
    value: '',
    validate: LOGIN_VALIDATION.USER_NAME,
  },
  email: {
    value: '',
    validate: LOGIN_VALIDATION.EMAIL,
  },
  password: {
    value: '',
    validate: LOGIN_VALIDATION.PASSWORD,
  },
} as const;
