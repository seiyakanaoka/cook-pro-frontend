'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { FormText } from '@/components/ui/form/FormText';
import { SIGN_UP_FORM_VALUES } from '@/constants/validation/signup';
import { useFormText } from '@/hooks/useFormText';
import { SignUpFormValues } from '@/types/signup';

import style from './index.module.scss';

export const SignUp: FC = () => {
  const { push, back } = useRouter();

  const {
    fieldValue,
    fieldState: { isValid, errors },
    onChange,
    onSubmit,
  } = useFormText<SignUpFormValues>({
    defaultValues: SIGN_UP_FORM_VALUES,
  });

  const navigateToSignUpConfirm = () => {
    push('/signup/confirm');
  };

  return (
    <form className={style['sign-up']} onSubmit={onSubmit}>
      <h1 className={style['title']}>新規登録</h1>
      <div className={style['sign-up-field']}>
        <div className={style['field']}>
          <FormText
            title="姓"
            value={fieldValue.lastName}
            errorMessage={errors?.lastName}
            onChange={(e) => onChange('lastName', e)}
          />
          <FormText
            title="名"
            value={fieldValue.firstName}
            errorMessage={errors?.firstName}
            onChange={(e) => onChange('firstName', e)}
          />
        </div>
        <div className={style['field']}>
          <FormText
            title="姓カナ"
            value={fieldValue.lastNameKana}
            errorMessage={errors?.lastNameKana}
            onChange={(e) => onChange('lastNameKana', e)}
          />
          <FormText
            title="名カナ"
            value={fieldValue.firstNameKana}
            errorMessage={errors?.firstNameKana}
            onChange={(e) => onChange('firstNameKana', e)}
          />
        </div>
        <FormText
          title="Email"
          value={fieldValue.email}
          errorMessage={errors?.email}
          onChange={(e) => onChange('email', e)}
        />
        <FormText
          title="Email確認"
          value={fieldValue.emailConfirm}
          errorMessage={errors?.emailConfirm}
          onChange={(e) => onChange('emailConfirm', e)}
        />
        <FormText
          title="パスワード"
          value={fieldValue.password}
          errorMessage={errors?.password}
          onChange={(e) => onChange('password', e)}
        />
        <FormText
          title="パスワード確認"
          value={fieldValue.passwordConfirm}
          errorMessage={errors?.passwordConfirm}
          onChange={(e) => onChange('passwordConfirm', e)}
        />
        <FormText
          title="電話番号"
          value={fieldValue.telephone}
          errorMessage={errors?.telephone}
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
