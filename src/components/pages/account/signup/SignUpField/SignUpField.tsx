'use client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FC } from 'react';

import { Button } from '@/components/ui/Button';
import { FormText } from '@/components/ui/form/FormText';
import { FORM_TEXT_FIELD_TYPE } from '@/constants/form';
import { FieldState, FieldValueValidate } from '@/types/form';
import { SignUpFormValues } from '@/types/signup';

import style from './index.module.scss';

type Props = {
  signUpFormValues: SignUpFormValues;
  fieldState: FieldState<SignUpFormValues>;
  onChange: (
    key: keyof SignUpFormValues,
    value: ChangeEvent<HTMLInputElement>,
    validate?: FieldValueValidate | undefined
  ) => void;
};

export const SignUpField: FC<Props> = ({
  signUpFormValues,
  fieldState,
  onChange,
}: Props) => {
  const { push, back } = useRouter();

  const navigateToSignUpConfirm = () => {
    push('/signup?status=confirm');
  };

  return (
    <div className={style['sign-up']}>
      <h1 className={style['title']}>新規登録</h1>
      <div className={style['sign-up-field']}>
        <div className={style['field']}>
          <FormText
            title="姓"
            value={signUpFormValues.lastName}
            errorMessage={fieldState.errors?.lastName}
            onChange={(e) => onChange('lastName', e)}
          />
          <FormText
            title="名"
            value={signUpFormValues.firstName}
            errorMessage={fieldState.errors?.firstName}
            onChange={(e) => onChange('firstName', e)}
          />
        </div>
        <div className={style['field']}>
          <FormText
            title="姓カナ"
            value={signUpFormValues.lastNameKana}
            errorMessage={fieldState.errors?.lastNameKana}
            onChange={(e) => onChange('lastNameKana', e)}
          />
          <FormText
            title="名カナ"
            value={signUpFormValues.firstNameKana}
            errorMessage={fieldState.errors?.firstNameKana}
            onChange={(e) => onChange('firstNameKana', e)}
          />
        </div>
        <div className={style['field']}>
          <FormText
            title="Email"
            value={signUpFormValues.email}
            errorMessage={fieldState.errors?.email}
            onChange={(e) => onChange('email', e)}
          />
        </div>
        <div className={style['field']}>
          <FormText
            title="Email確認"
            value={signUpFormValues.emailConfirm}
            errorMessage={fieldState.errors?.emailConfirm}
            onChange={(e) => onChange('emailConfirm', e)}
          />
        </div>
        <div className={style['field']}>
          <FormText
            title="パスワード"
            value={signUpFormValues.password}
            type={FORM_TEXT_FIELD_TYPE.PASSWORD}
            errorMessage={fieldState.errors?.password}
            onChange={(e) => onChange('password', e)}
          />
        </div>
        <div className={style['field']}>
          <FormText
            title="パスワード確認"
            value={signUpFormValues.passwordConfirm}
            type={FORM_TEXT_FIELD_TYPE.PASSWORD}
            errorMessage={fieldState.errors?.passwordConfirm}
            onChange={(e) => onChange('passwordConfirm', e)}
          />
        </div>
        <FormText
          title="電話番号"
          value={signUpFormValues.telephone}
          errorMessage={fieldState.errors?.telephone}
          onChange={(e) => onChange('telephone', e)}
        />
      </div>
      <div className={style['actions']}>
        <Button
          text="進む"
          color="primary"
          onClick={navigateToSignUpConfirm}
          isDisabled={!fieldState.isValid}
        />
        <Button text="キャンセル" color="secondary" onClick={back} />
      </div>
    </div>
  );
};
