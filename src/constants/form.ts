export const FORM_TEXT_FIELD_TYPE = {
  TEXT: 'text',
  PASSWORD: 'password',
} as const;

export type FormTextFieldType =
  (typeof FORM_TEXT_FIELD_TYPE)[keyof typeof FORM_TEXT_FIELD_TYPE];
