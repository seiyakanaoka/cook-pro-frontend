'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { FormText } from '@/components/ui/form/FormText';
import { BUTTON_COLOR } from '@/constants/button';
import { PAGE_URL } from '@/constants/route';
import { UserResponse } from '@/types/codegen/user/UserResponse';

import style from './index.module.scss';

type Props = {
  userResponse: UserResponse | undefined;
};

export const UserEdit: FC<Props> = ({ userResponse }: Props) => {
  const { push } = useRouter();

  const navigateToUserDetail = () => {
    push(PAGE_URL.USER);
  };

  const handleEditUser = () => {
    navigateToUserDetail();
  };

  return (
    <div className={style['user-edit-component']}>
      <div className={style['field']}>
        <FormText
          title="ニックネーム"
          value={userResponse?.displayUserName ?? ''}
          onChange={() => {}}
        />
        <FormText
          title="Eメール"
          value={userResponse?.email ?? ''}
          onChange={() => {}}
        />
        <FormText
          title="電話番号"
          value={userResponse?.telNumber ?? ''}
          onChange={() => {}}
        />
      </div>
      <div className={style['actions']}>
        <Button
          color={BUTTON_COLOR.primary}
          text="完了"
          onClick={handleEditUser}
        />
        <Button
          color={BUTTON_COLOR.secondary}
          text="戻る"
          onClick={navigateToUserDetail}
        />
      </div>
    </div>
  );
};
