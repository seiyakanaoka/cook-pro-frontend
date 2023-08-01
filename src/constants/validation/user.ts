import { DefaultValues, FieldValueValidate } from '@/types/Form';
import { UserFormValues } from '@/types/User';

export const USER_DETAIL_VALIDATION: {
  EMAIL: FieldValueValidate;
  TELEPHONE: FieldValueValidate;
} = {
  EMAIL: {
    required: { value: true, message: '入力してください。' },
    regex: {
      value: /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
      message: 'メールアドレスの形式が正しくありません。',
    },
  },
  TELEPHONE: {
    required: { value: true, message: '入力してください。' },
    regex: { value: /^[0-9]+$/, message: '半角数字のみ入力できます。' },
  },
} as const;

export const USER_FORM_VALUES: DefaultValues<UserFormValues> = {
  userImage: {
    value: '',
  },
  nickname: {
    value: '',
  },
  email: {
    value: '',
    validate: USER_DETAIL_VALIDATION.EMAIL,
  },
  telNumber: {
    value: '',
    validate: USER_DETAIL_VALIDATION.TELEPHONE,
  },
} as const;
