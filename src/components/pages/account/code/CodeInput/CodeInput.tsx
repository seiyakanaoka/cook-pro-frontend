'use client';

import { FC } from 'react';

import { useFormText } from '@/hooks/useFormText';

import style from './index.module.scss';

type CodeInputFormValues = {
  code: string;
};

export const CodeInput: FC = () => {
  const { fieldValue, onChange } = useFormText<CodeInputFormValues>({
    defaultValues: { code: { value: '' } },
  });
  return (
    <div className={style['code-input-component']}>
      <input value={fieldValue.code} onChange={(e) => onChange('code', e)} />
    </div>
  );
};
