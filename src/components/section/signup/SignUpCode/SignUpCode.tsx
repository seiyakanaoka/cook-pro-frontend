import { useRouter } from 'next/router';
import { FC, useContext } from 'react';

import { Button } from '@/components/ui/Button';
import { FormText } from '@/components/ui/form/FormText';
import { BUTTON_COLOR } from '@/constants/button';
import { PAGE_URL } from '@/constants/route';
import { SNACKBAR_STATUS } from '@/constants/snackbar';
import { SnackbarContext } from '@/context/snackbarContext';
import { useUserRequest } from '@/hooks/api/user/useUserRequest';
import { useCognito } from '@/hooks/aws/useCognito';
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
  const { addSnackbar } = useContext(SnackbarContext);

  const { push } = useRouter();

  const { createUser } = useUserRequest();

  const { fieldValue, onChange } = useFormText<CodeInputFormValues>({
    defaultValues: { code: { value: '' } },
  });

  const { login, confirmUser } = useCognito();

  const handleSubmit = async () => {
    if (signUpFormValues.userName == null) return;
    const result = await confirmUser(
      signUpFormValues.userName,
      fieldValue.code
    );
    // TODO: 定数にする
    if (result !== 'SUCCESS') {
      // TODO: 仮のエラーハンドリング
      addSnackbar('確認コードが不正です', SNACKBAR_STATUS.ABNORMAL);
      return;
    }

    const requestBody = {
      userName: signUpFormValues.userName,
      email: signUpFormValues.email,
      telNumber: signUpFormValues.telephone,
    };

    const { idToken } = await login(
      signUpFormValues.userName,
      signUpFormValues.password
    );

    const headers = {
      Authorization: `Bearer ${idToken}`,
    };

    await createUser(requestBody, { headers });

    await push(PAGE_URL.HOME);
    addSnackbar('Cook Proへようこそ');
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
      <Button text="送信" onClick={handleSubmit} color={BUTTON_COLOR.PRIMARY} />
    </div>
  );
};
