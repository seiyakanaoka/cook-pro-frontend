import { ChangeEvent, FormEventHandler, useState } from 'react';

import {
  FieldValues,
  FieldValueKey,
  FieldValueValidate,
  FieldState,
  FieldErrors,
  UseFormTextArgs,
  ErrorMessage,
} from '@/types/Form';
import { getErrorMessage, getErrorValues } from '@/utils/form';

type UseFormText<T extends FieldValues> = {
  fieldValue: T;
  fieldState: FieldState<T>;
  onChange: (
    key: keyof T,
    value: ChangeEvent<HTMLInputElement> | string,
    validate?: FieldValueValidate
  ) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export const useFormText = <T extends FieldValues>({
  mode = 'onChange',
  defaultValues: _defaultValues,
}: UseFormTextArgs<T>): UseFormText<T> => {
  const defaultValues = Object.fromEntries(
    Object.keys(_defaultValues).map((key) => [key, _defaultValues[key].value])
  );

  const [fieldValue, setFieldValue] = useState<FieldValues>(defaultValues);

  const [fieldState, setFieldState] = useState<FieldState<T>>({
    errors: undefined,
    isValid: false,
  });

  const onChange = (
    key: FieldValueKey<T>,
    evt: ChangeEvent<HTMLInputElement> | string
  ) => {
    const input = typeof evt === 'string' ? evt : evt.currentTarget.value;

    const newValue = { ...fieldValue, [key]: input };
    setFieldValue(newValue);

    if (mode !== 'onChange') return;

    const errorMessage = getErrorMessage(_defaultValues[key].validate, input);

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
      const newErrors: FieldErrors<T> = Object.fromEntries(
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
        errors: !!Object.keys(newErrors).length ? newErrors : undefined,
      });
    }
  };

  // isValidの計算
  (() => {
    const { errors, isValid } = fieldState;

    const hasRequiredErrors =
      Object.keys(_defaultValues)
        .filter(
          (key) =>
            typeof _defaultValues[key]?.validate !== 'undefined' ||
            !!_defaultValues[key]?.validate?.required?.value
        )
        .map((key) => ({ key, value: fieldValue[key] }))
        .filter((keyValue) => !keyValue.value).length > 0;

    const errorValues = getErrorValues(errors);

    const isNewValid = errorValues.length === 0 && !hasRequiredErrors;

    if (isValid === isNewValid) {
      return;
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
