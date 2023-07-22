import { DefaultValues, FieldValueValidate } from '@/types/form';
import { SignUpFormValues } from '@/types/signup';

export const SIGN_UP_VALIDATION: {
  USER_NAME: FieldValueValidate;
  EMAIL: FieldValueValidate;
  EMAIL_CONFIRM: FieldValueValidate;
  PASSWORD: FieldValueValidate;
  PASSWORD_CONFIRM: FieldValueValidate;
  TELEPHONE: FieldValueValidate;
} = {
  USER_NAME: {
    required: { value: true, message: '入力してください。' },
    maxLength: { value: 100, message: '100文字まで入力可能です。' },
    regex: {
      value: /^[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠a-zA-Z0-9]+$/,
      message: '半角英数字とひらがな・カタカナ・漢字が入力できます。',
    },
  },
  EMAIL: {
    required: { value: true, message: '入力してください。' },
    regex: {
      value: /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
      message: 'メールアドレスの形式が正しくありません。',
    },
  },
  EMAIL_CONFIRM: {
    required: { value: true, message: '入力してください。' },
    regex: {
      value: /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
      message: 'メールアドレスの形式が正しくありません。',
    },
  },
  PASSWORD: {
    required: { value: true, message: '入力してください。' },
    minLength: { value: 8, message: '8文字から30文字の間で入力してください。' },
    maxLength: { value: 30, message: '8文字から30文字の間で入力してください' },
    regex: {
      value:
        /^[0-9a-zA-Z\^\$\*\.\[\]\{\}\(\)\?\-\"\!\@\#\%\&\/\\\,\>\<\'\:\;\|\_\~\`\+\=]+$/,
      message: '半角英数字と記号のみ入力できます。',
    },
  },
  PASSWORD_CONFIRM: {
    required: { value: true, message: '入力してください。' },
    minLength: { value: 8, message: '8文字から30文字の間で入力してください。' },
    maxLength: { value: 30, message: '8文字から30文字の間で入力してください' },
    regex: {
      value:
        /^[0-9a-zA-Z\^\$\*\.\[\]\{\}\(\)\?\-\"\!\@\#\%\&\/\\\,\>\<\'\:\;\|\_\~\`\+\=]+$/,
      message: '半角英数字と記号のみ入力できます。',
    },
  },
  TELEPHONE: {
    required: { value: true, message: '入力してください。' },
    regex: { value: /^[0-9]+$/, message: '半角数字のみ入力できます。' },
  },
} as const;

export const SIGN_UP_FORM_VALUES: DefaultValues<SignUpFormValues> = {
  userName: {
    value: '',
    validate: SIGN_UP_VALIDATION.USER_NAME,
  },
  email: {
    value: '',
    validate: SIGN_UP_VALIDATION.EMAIL,
  },
  emailConfirm: {
    value: '',
    validate: SIGN_UP_VALIDATION.EMAIL_CONFIRM,
  },
  password: {
    value: '',
    validate: SIGN_UP_VALIDATION.PASSWORD,
  },
  passwordConfirm: {
    value: '',
    validate: SIGN_UP_VALIDATION.PASSWORD_CONFIRM,
  },
  telephone: {
    value: '',
    validate: SIGN_UP_VALIDATION.TELEPHONE,
  },
} as const;
