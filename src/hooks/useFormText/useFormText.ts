import { ChangeEvent, FormEventHandler, useState } from 'react';

import {
  FieldValues,
  FieldValueKey,
  FieldValueValidate,
  FieldState,
  FieldErrors,
  UseFormTextArgs,
  ErrorMessage,
} from '@/types/form';
import { getErrorMessage, getErrorValues } from '@/utils/form';

type UseFormText<T extends FieldValues> = {
  fieldValue: T;
  fieldState: FieldState<T>;
  onChange: (
    key: keyof T,
    value: ChangeEvent<HTMLInputElement>,
    validate?: FieldValueValidate
  ) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export const useFormText = <T extends FieldValues>({
  mode = 'onChange',
  defaultValues,
}: UseFormTextArgs<T>): UseFormText<T> => {
  const [fieldValue, setFieldValue] = useState<FieldValues>(defaultValues);

  const [fieldState, setFieldState] = useState<FieldState<T>>({
    errors: undefined,
    isValid: false,
  });

  const onChange = (
    key: FieldValueKey<T>,
    evt: ChangeEvent<HTMLInputElement>,
    validate?: FieldValueValidate
  ) => {
    const input = evt.currentTarget.value;

    const newValue = { ...fieldValue, [key]: evt.currentTarget.value };
    setFieldValue(newValue);

    if (mode !== 'onChange') return;

    const errorMessage = getErrorMessage(validate, input);

    const errors = fieldState.errors;

    if (typeof errorMessage !== 'undefined') {
      const newErrors = {
        ...errors,
        [key]: errorMessage,
      } as FieldErrors<T>;

      setFieldState({
        ...fieldState,
        errors: newErrors,
      });
    }

    if (typeof errorMessage === 'undefined' && typeof errors !== 'undefined') {
      const newErrors = Object.fromEntries(
        Object.keys(errors)
          .map((errorKey) => {
            if (errorKey === key) return;
            return [errorKey, errors[errorKey]];
          })
          .filter(
            (value): value is (string | ErrorMessage)[] =>
              typeof value !== 'undefined'
          )
      );
      setFieldState({
        ...fieldState,
        errors: newErrors,
      });
    }
  };

  // isValidの計算
  (() => {
    if (typeof fieldState.errors === 'undefined') return;

    const { errors, isValid } = fieldState;

    const errorValues = getErrorValues(errors);

    const isNewValid = errorValues.length === 0;

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
