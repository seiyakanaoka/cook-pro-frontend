import { ChangeEvent, useState } from 'react';

type FieldValue = {
  [x: string]: any;
};

type FieldValueKey<T extends FieldValue> = keyof T;

type UseFormText<T> = {
  fieldValue: T;
  onChange: (key: keyof T, value: ChangeEvent<HTMLInputElement>) => void;
};

export const useFormText = <T extends FieldValue>(
  defaultValues?: T
): UseFormText<T> => {
  const [fieldValue, setFieldValue] = useState<FieldValue>(defaultValues ?? {});

  const onChange = (
    key: FieldValueKey<T>,
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = { ...fieldValue, [key]: evt.currentTarget.value };
    setFieldValue(newValue);
  };

  // TODO: 型アサーションがやめれるか時間があれば考える
  return { fieldValue: fieldValue as T, onChange };
};
