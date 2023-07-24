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

  const { login, confirm } = useAuth();

  const handleSubmit = async () => {
    if (signUpFormValues.userName == null) return;
    const result = await confirm(signUpFormValues.userName, fieldValue.code);
    // TODO: 定数にする
    if (result !== 'SUCCESS') {
      // TODO: 仮のエラーハンドリング
      alert('確認コードが不正です。再度入力してください。');
      return;
    }
    await login(signUpFormValues.userName, signUpFormValues.password);
    push('/');
    // TODO: ログインできた時のスナックバーを出す
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
