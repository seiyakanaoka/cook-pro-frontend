import { DefaultValues, FieldValueValidate } from '@/types/Form';
import { LoginFormValues } from '@/types/login';

export const LOGIN_VALIDATION: {
  USER_NAME_OR_EMAIL: FieldValueValidate;
  PASSWORD: FieldValueValidate;
} = {
  USER_NAME_OR_EMAIL: {
    required: { value: true, message: '必須項目です' },
  },
  PASSWORD: {
    required: { value: true, message: '必須項目です' },
    minLength: { value: 8, message: '8文字から30文字まで入力可能です' },
    maxLength: { value: 30, message: '8文字から30文字まで入力可能です' },
    regex: {
      value:
        /^[0-9a-zA-Z\^\$\*\.\[\]\{\}\(\)\?\-\"\!\@\#\%\&\/\\\,\>\<\'\:\;\|\_\~\`\+\=]+$/,
      message: '半角英数字と記号のみ入力できます。',
    },
  },
} as const;

export const LOGIN_FORM_VALUES: DefaultValues<LoginFormValues> = {
  userNameOrEmail: {
    value: '',
    validate: LOGIN_VALIDATION.USER_NAME_OR_EMAIL,
  },
  password: {
    value: '',
    validate: LOGIN_VALIDATION.PASSWORD,
  },
} as const;
