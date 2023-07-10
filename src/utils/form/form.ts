import { z } from 'zod';

import { ErrorMessage, FieldErrors, FieldValueValidate } from '@/types/form';

export const getErrorMessage = (
  validate: FieldValueValidate | undefined,
  input: string
): ErrorMessage => {
  try {
    const required = z.string().min(1);
    required.parse(input);

    const maxLength = z
      .string()
      .max(validate?.maxLength?.value ?? Number.MAX_SAFE_INTEGER);
    maxLength.parse(input);

    const minLength = z.string().min(validate?.minLength?.value ?? 0);
    minLength.parse(input);

    const errorMessage: ErrorMessage = {
      required: undefined,
      minLength: undefined,
      maxLength: undefined,
    };
    return errorMessage;
  } catch (err) {
    const errorMessage: ErrorMessage = {
      required: validate?.required?.message,
      maxLength: validate?.maxLength?.message,
      minLength: validate?.minLength?.message,
    };
    return errorMessage;
  }
};

export const getErrorValues = (
  fieldErrors: FieldErrors | undefined
): ErrorMessage[] => {
  if (typeof fieldErrors === 'undefined') return [];
  return Object.values(fieldErrors).filter(
    (values) =>
      typeof values.maxLength !== 'undefined' ||
      typeof values.minLength !== 'undefined' ||
      typeof values.required !== 'undefined'
  );
};
