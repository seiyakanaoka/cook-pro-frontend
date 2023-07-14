import { z } from 'zod';

import {
  FieldValues,
  ErrorMessage,
  FieldErrors,
  FieldValueValidate,
} from '@/types/form';

export const getErrorMessage = (
  validate: FieldValueValidate | undefined,
  input: string
): ErrorMessage | undefined => {
  const errorMessage: ErrorMessage = {
    required: undefined,
    minLength: undefined,
    maxLength: undefined,
    regex: undefined,
  };

  if (validate?.required?.message) {
    try {
      const required = z.string().min(1);
      required.parse(input);
    } catch (err) {
      errorMessage.required = validate.required.message;
    }
  }

  if (validate?.maxLength?.value) {
    try {
      const maxLength = z.string().max(validate?.maxLength?.value);
      maxLength.parse(input);
    } catch (err) {
      errorMessage.maxLength = validate.maxLength.message;
    }
  }

  if (validate?.minLength?.value) {
    try {
      const minLength = z.string().min(validate?.minLength?.value);
      minLength.parse(input);
    } catch (err) {
      errorMessage.minLength = validate.minLength.message;
    }
  }

  if (validate?.regex?.value) {
    try {
      const regex = validate.regex.value
        ? z.string().regex(validate.regex.value)
        : null;
      regex?.parse(input);
    } catch (err) {
      errorMessage.regex = validate.regex.message;
    }
  }

  const hasError =
    Object.values(errorMessage).filter(
      (values) => typeof values !== 'undefined'
    ).length > 0;

  return hasError ? errorMessage : undefined;
};

export const getErrorValues = <T extends FieldValues>(
  fieldErrors: FieldErrors<T> | undefined
): ErrorMessage[] => {
  if (typeof fieldErrors === 'undefined') return [];
  return Object.values(fieldErrors).filter(
    (values) =>
      typeof values.maxLength !== 'undefined' ||
      typeof values.minLength !== 'undefined' ||
      typeof values.required !== 'undefined' ||
      typeof values.regex !== 'undefined'
  );
};
