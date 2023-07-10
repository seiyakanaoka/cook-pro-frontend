import { z } from 'zod';

import { ErrorMessage, FieldValueValidate } from '@/types/form';

export const getErrorMessage = (
  validate: FieldValueValidate | undefined,
  input: string
) => {
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
      required: validate?.required?.message ?? 'invalid input',
      minLength: validate?.maxLength?.message ?? 'invalid input',
      maxLength: validate?.minLength?.message ?? 'invalid input',
    };
    return errorMessage;
  }
};
