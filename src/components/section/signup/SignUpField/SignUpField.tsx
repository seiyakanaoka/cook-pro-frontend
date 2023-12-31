import { useRouter } from 'next/navigation';
import { ChangeEvent, FC } from 'react';

import { Button } from '@/components/ui/Button';
import { FormText } from '@/components/ui/form/FormText';
import { BUTTON_COLOR } from '@/constants/button';
import { FORM_TEXT_FIELD_TYPE } from '@/constants/form';
import { PAGE_URL } from '@/constants/route';
import { FieldState, FieldValueValidate } from '@/types/Form';
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
    push(`${PAGE_URL.SIGN_UP}?status=confirm`);
  };

  return (
    <div className={style['sign-up']}>
      <h1 className={style['title']}>新規登録</h1>
      <div className={style['sign-up-field']}>
        <FormText
          title="ユーザー名"
          value={signUpFormValues.userName}
          errorMessage={fieldState.errors?.userName}
          onChange={(e) => onChange('userName', e)}
        />
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
            title="パスワード"
            value={signUpFormValues.password}
            type={FORM_TEXT_FIELD_TYPE.PASSWORD}
            errorMessage={fieldState.errors?.password}
            onChange={(e) => onChange('password', e)}
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
          color={BUTTON_COLOR.PRIMARY}
          onClick={navigateToSignUpConfirm}
          isDisabled={!fieldState.isValid}
        />
        <Button
          text="キャンセル"
          color={BUTTON_COLOR.SECONDARY}
          onClick={back}
        />
      </div>
    </div>
  );
};
