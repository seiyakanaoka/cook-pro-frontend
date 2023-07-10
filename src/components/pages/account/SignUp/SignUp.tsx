'use client';

import { FC, ChangeEventHandler, useState } from 'react';

import { FormText } from '@/components/ui/form/FormText';
import { useFormText } from '@/hooks/useFormText';

import style from './index.module.scss';

type Props = {};

export const SignUp: FC<Props> = ({}: Props) => {
  const [lastName, setLastName] = useState<string>('');

  useFormText<{ text: string }>();

  const handleChangeLastName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLastName(e.currentTarget.value);
  };

  const [firstName, setFirstName] = useState<string>('');

  const handleChangeFirstName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFirstName(e.currentTarget.value);
  };

  const [lastNameKana, setLastNameKana] = useState<string>('');

  const handleChangeLastNameKana: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setLastNameKana(e.currentTarget.value);
  };

  const [firstNameKana, setFirstNameKana] = useState<string>('');

  const handleChangeFirstNameKana: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setFirstNameKana(e.currentTarget.value);
  };

  const [email, setEmail] = useState<string>('');

  const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.currentTarget.value);
  };

  const [emailConfirm, setEmailConfirm] = useState<string>('');

  const handleChangeEmailConfirm: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setEmailConfirm(e.currentTarget.value);
  };

  const [password, setPassword] = useState<string>('');

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.currentTarget.value);
  };

  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const handleChangePasswordConfirm: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setPasswordConfirm(e.currentTarget.value);
  };

  const [telephone, setTelephone] = useState<string>('');

  const handleChangeTelephone: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTelephone(e.currentTarget.value);
  };

  return (
    <div className={style['sign-up']}>
      <div className={style['field']}>
        <FormText title="姓" value={lastName} onChange={handleChangeLastName} />
        <FormText
          title="名"
          value={firstName}
          onChange={handleChangeFirstName}
        />
      </div>
      <div className={style['field']}>
        <FormText
          title="姓カナ"
          value={lastNameKana}
          onChange={handleChangeLastNameKana}
        />
        <FormText
          title="名カナ"
          value={firstNameKana}
          onChange={handleChangeFirstNameKana}
        />
      </div>
      <FormText title="Email" value={email} onChange={handleChangeEmail} />
      <FormText
        title="Email確認"
        value={emailConfirm}
        onChange={handleChangeEmailConfirm}
      />
      <FormText
        title="パスワード"
        value={password}
        onChange={handleChangePassword}
      />
      <FormText
        title="パスワード確認"
        value={passwordConfirm}
        onChange={handleChangePasswordConfirm}
      />
      <FormText
        title="電話番号"
        value={telephone}
        onChange={handleChangeTelephone}
      />
    </div>
  );
};
