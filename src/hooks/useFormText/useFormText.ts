import { ChangeEvent, FormEventHandler, useState } from 'react';

import {
  FieldValue,
  FieldValueKey,
  FieldValueValidate,
  FieldState,
  UseFormTextArgs,
} from '@/types/form';
import { getErrorMessage } from '@/utils/form';

type UseFormText<T> = {
  fieldValue: T;
  fieldState: FieldState;
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

  const [fieldState, setFieldState] = useState<FieldState>({
    errors: undefined,
    isValid: false,
  });

  const onChange = (
    key: FieldValueKey<T>,
    evt: ChangeEvent<HTMLInputElement>,
    validate?: FieldValueValidate
  ) => {
    const input = evt.currentTarget.value;
    const result = getErrorMessage(validate, input);

    if (typeof result !== 'undefined') {
      setFieldState({
        ...fieldState,
        errors: { [key]: result },
        isValid: false,
      });
    }

    const newValue = { ...fieldValue, [key]: evt.currentTarget.value };
    setFieldValue(newValue);
  };

  // isValidの計算
  (() => {
    const { errors, isValid } = fieldState;

    const errorValues = (() => {
      if (typeof errors === 'undefined') return 0;
      const errorValues = Object.values(errors).filter(
        (values) =>
          typeof values.maxLength !== 'undefined' ||
          typeof values.minLength !== 'undefined' ||
          typeof values.required !== 'undefined'
      );
      return errorValues.length;
    })();
    const isNewValid = errorValues > 0;

    if (isValid === isNewValid) {
      return isValid;
    }

    setFieldState({
      ...fieldState,
      isValid: isNewValid,
    });
  })();

  const onSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    if (mode === 'onSubmit') {
    }
    return fieldValue;
  };

  // TODO: 型アサーションがやめれるか時間があれば考える
  return { fieldValue: fieldValue as T, fieldState, onChange, onSubmit };
};
