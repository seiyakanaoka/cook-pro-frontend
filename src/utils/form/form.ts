import { z } from 'zod';

import { FieldValueValidate } from '@/types/form';

export const formValidator = (
  validate: FieldValueValidate | undefined,
  input: string
) => {
  if (typeof validate === 'undefined') {
    return;
  }
  if (!!validate.required) {
    try {
      const required = z.string().min(1);
      required.parse(input);
    } catch (err: any) {
      return validate.required.message ?? 'invalid input';
    }
  } else if (typeof validate.maxLength !== 'undefined') {
    try {
      const maxLength = z.string().max(validate.maxLength.value);
      maxLength.parse(input);
    } catch (err: any) {
      return validate.maxLength.message ?? 'invalid input';
    }
  } else if (typeof validate.minLength !== 'undefined') {
    try {
      const minLength = z.string().min(validate.minLength.value);
      minLength.parse(input);
    } catch (err: any) {
      return validate.minLength.message ?? 'invalid input';
    }
  }
};
