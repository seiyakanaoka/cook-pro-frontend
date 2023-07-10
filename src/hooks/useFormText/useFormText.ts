import { useState } from 'react';

type FieldValue = {
  [x: string]: any;
};

type FieldValueKey<T extends FieldValue> = keyof T;

type UseFormText<T> = {
  fieldValue: FieldValue;
  onChange: (key: keyof T, value: string) => void;
};

export const useFormText = <T extends FieldValue>(
  defaultValues: T
): UseFormText<T> => {
  const [fieldValue, setFieldValue] = useState<FieldValue>(defaultValues);

  const onChange = (key: FieldValueKey<T>, value: string) => {
    const newValue = { ...fieldValue, [key]: value };
    setFieldValue(newValue);
  };

  return { fieldValue, onChange };
};
