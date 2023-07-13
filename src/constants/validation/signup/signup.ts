import { FieldValueValidate } from '@/types/form';

export const SIGN_UP_VALIDATION: {
  LAST_NAME: FieldValueValidate;
  FIRST_NAME: FieldValueValidate;
  LAST_NAME_KANA: FieldValueValidate;
  FIRST_NAME_KANA: FieldValueValidate;
  EMAIL: FieldValueValidate;
  EMAIL_CONFIRM: FieldValueValidate;
  PASSWORD: FieldValueValidate;
  PASSWORD_CONFIRM: FieldValueValidate;
  TELEPHONE: FieldValueValidate;
} = {
  LAST_NAME: {
    required: { value: true, message: '入力してください。' },
    maxLength: { value: 100, message: '100文字まで入力可能です。' },
    regex: {
      value: /^[ぁ-んァ-ヶ亜-熙a-zA-Z0-9]+$/,
      message: '半角英数字とひらがな・カタカナ・漢字が入力できます。',
    },
  },
  FIRST_NAME: {
    required: { value: true, message: '入力してください。' },
    maxLength: { value: 100, message: '100文字まで入力可能です。' },
    regex: {
      value: /^[ぁ-んァ-ヶ亜-熙a-zA-Z0-9]+$/,
      message: '半角英数字とひらがな・カタカナ・漢字が入力できます。',
    },
  },
  LAST_NAME_KANA: {
    required: { value: true, message: '入力してください。' },
    maxLength: { value: 100, message: '100文字まで入力可能です。' },
    regex: {
      value: /^[ァ-ンー]+$/,
      message: 'カタカナのみ入力できます。',
    },
  },
  FIRST_NAME_KANA: {
    required: { value: true, message: '入力してください。' },
    maxLength: { value: 100, message: '100文字まで入力可能です。' },
    regex: {
      value: /^[ァ-ンー]+$/,
      message: 'カタカナのみ入力できます。',
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
      value: /^[a-zA-Z0-9]+$/,
      message: '半角英数字のみ入力できます。',
    },
  },
  PASSWORD_CONFIRM: {
    required: { value: true, message: '入力してください。' },
    minLength: { value: 8, message: '8文字から30文字の間で入力してください。' },
    maxLength: { value: 30, message: '8文字から30文字の間で入力してください' },
    regex: {
      value: /^[a-zA-Z0-9]+$/,
      message: '半角英数字のみ入力できます。',
    },
  },
  TELEPHONE: {
    required: { value: true, message: '入力してください。' },
    regex: { value: /^[0-9]+$/, message: '半角数字のみ入力できます。' },
  },
} as const;
