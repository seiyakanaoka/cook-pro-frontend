'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
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
  const { push, back } = useRouter();

  const {
    fieldValue,
    fieldState: { isValid },
    onChange,
    onSubmit,
  } = useFormText<SignUpFormValues>({
    defaultValues: {
      lastName: '',
      firstName: '',
      lastNameKana: '',
      firstNameKana: '',
      email: '',
      emailConfirm: '',
      password: '',
      passwordConfirm: '',
      telephone: '',
    },
  });

  const navigateToSignUpConfirm = () => {
    push('/signup/confirm');
  };

  console.log('render');

  return (
    <form className={style['sign-up']} onSubmit={onSubmit}>
      <h1 className={style['title']}>新規登録</h1>
      <div className={style['sign-up-field']}>
        <div className={style['field']}>
          <FormText
            title="姓"
            value={fieldValue.lastName}
            onChange={(e) =>
              onChange('lastName', e, { required: { value: true } })
            }
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
      <div className={style['actions']}>
        <Button
          text="進む"
          color="primary"
          onClick={navigateToSignUpConfirm}
          isDisabled={!isValid}
        />
        <Button text="キャンセル" color="secondary" onClick={back} />
      </div>
    </form>
  );
};
