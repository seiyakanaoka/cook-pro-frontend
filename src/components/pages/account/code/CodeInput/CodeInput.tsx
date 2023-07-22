'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { FormText } from '@/components/ui/form/FormText';
import { useAuth } from '@/hooks/useAuth';
import { useFormText } from '@/hooks/useFormText';

import style from './index.module.scss';

type CodeInputFormValues = {
  code: string;
};

export const CodeInput: FC = () => {
  const { push } = useRouter();

  const userName = useSearchParams()?.get('userName');

  const { fieldValue, onChange } = useFormText<CodeInputFormValues>({
    defaultValues: { code: { value: '' } },
  });

  const { confirm } = useAuth();

  const handleSubmit = async () => {
    if (userName == null) return;
    await confirm(userName, fieldValue.code);
    push('/');
  };

  return (
    <div className={style['code-input-component']}>
      <h1 className={style['title']}>確認コード</h1>
      <div className={style['field']}>
        <FormText
          title="確認コード"
          value={fieldValue.code}
          onChange={(e) => onChange('code', e)}
        />
      </div>
      <Button text="送信" onClick={handleSubmit} color="primary" />
    </div>
  );
};
