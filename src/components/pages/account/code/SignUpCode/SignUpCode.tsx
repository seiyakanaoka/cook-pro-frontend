'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { FormText } from '@/components/ui/form/FormText';
import { useAuth } from '@/hooks/useAuth';
import { useFormText } from '@/hooks/useFormText';
import { SignUpFormValues } from '@/types/signup';

import style from './index.module.scss';

type CodeInputFormValues = {
  code: string;
};

type Props = {
  signUpFormValues: SignUpFormValues;
};

export const SignUpCode: FC<Props> = ({ signUpFormValues }: Props) => {
  const { push } = useRouter();

  const { fieldValue, onChange } = useFormText<CodeInputFormValues>({
    defaultValues: { code: { value: '' } },
  });

  const { confirm } = useAuth();

  const handleSubmit = async () => {
    if (signUpFormValues.userName == null) return;
    await confirm(signUpFormValues.userName, fieldValue.code);
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
