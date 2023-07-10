import { ChangeEvent, FormEventHandler, useState } from 'react';
import { z } from 'zod';

import {
  Mode,
  FieldValue,
  FieldValueKey,
  FieldValueValidate,
  FieldState,
  UseFormTextArgs,
} from '@/types/form';

type UseFormText<T> = {
  fieldValue: T;
  fieldState: FieldState<T>;
  onChange: (
    key: keyof T,
    value: ChangeEvent<HTMLInputElement>,
    validate?: FieldValueValidate
  ) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export const useFormText = <T extends FieldValue>({
  mode = 'onChange',
  defaultValues,
}: UseFormTextArgs<T>): UseFormText<T> => {
  const [fieldValue, setFieldValue] = useState<FieldValue>(defaultValues);

  const [fieldState, setFieldState] = useState<FieldState<T>>({
    errors: undefined,
    isValid: true,
  });

  const validator = (
    mode: Mode,
    validate: FieldValueValidate | undefined,
    input: string
  ) => {
    if (typeof validate === 'undefined') {
      return undefined;
    }

    switch (mode) {
      case 'onChange': {
        if (
          typeof validate === 'undefined' ||
          typeof validate.maxLength === 'undefined'
        )
          return;
        try {
          const maxLength = z.string().max(validate.maxLength.value);
          maxLength.parse(input);
        } catch (err: any) {
          return validate.maxLength.message ?? 'invalid input';
        }
      }
    }
  };

  const onChange = (
    key: FieldValueKey<T>,
    evt: ChangeEvent<HTMLInputElement>,
    validate?: FieldValueValidate
  ) => {
    const input = evt.currentTarget.value;
    const result = validator(mode, validate, input);

    if (typeof result !== 'undefined') {
      setFieldState({
        ...fieldState,
        errors: { [key]: result } as T,
        isValid: false,
      });
    }

    const newValue = { ...fieldValue, [key]: evt.currentTarget.value };
    setFieldValue(newValue);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    if (mode === 'onSubmit') {
    }
    return fieldValue;
  };

  // TODO: 型アサーションがやめれるか時間があれば考える
  return { fieldValue: fieldValue as T, fieldState, onChange, onSubmit };
};
