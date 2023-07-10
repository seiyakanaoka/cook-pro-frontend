'use client';

import { FC } from 'react';

import { FormText } from '@/components/ui/form/FormText';
import { useFormText } from '@/hooks/useFormText';

import style from './index.module.scss';

type Props = {};

type SignUpFormValues = {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
  telephone: string;
};

export const SignUp: FC<Props> = ({}: Props) => {
  const { fieldValue, onChange } = useFormText<SignUpFormValues>();

  return (
    <div className={style['sign-up']}>
      <div className={style['field']}>
        <FormText
          title="姓"
          value={fieldValue.lastName}
          onChange={(e) => onChange('lastName', e)}
        />
        <FormText
          title="名"
          value={fieldValue.firstName}
          onChange={(e) => onChange('firstName', e)}
        />
      </div>
      <div className={style['field']}>
        <FormText
          title="姓カナ"
          value={fieldValue.lastNameKana}
          onChange={(e) => onChange('lastNameKana', e)}
        />
        <FormText
          title="名カナ"
          value={fieldValue.firstNameKana}
          onChange={(e) => onChange('firstNameKana', e)}
        />
      </div>
      <FormText
        title="Email"
        value={fieldValue.email}
        onChange={(e) => onChange('email', e)}
      />
      <FormText
        title="Email確認"
        value={fieldValue.emailConfirm}
        onChange={(e) => onChange('emailConfirm', e)}
      />
      <FormText
        title="パスワード"
        value={fieldValue.password}
        onChange={(e) => onChange('password', e)}
      />
      <FormText
        title="パスワード確認"
        value={fieldValue.passwordConfirm}
        onChange={(e) => onChange('passwordConfirm', e)}
      />
      <FormText
        title="電話番号"
        value={fieldValue.telephone}
        onChange={(e) => onChange('telephone', e)}
      />
    </div>
  );
};
