'use client';

import { useRouter } from 'next/navigation';
import { FC, useContext } from 'react';

import CameraIcon from '@/assets/icons/camera.svg';
import { Button } from '@/components/ui/Button';
import { FormText } from '@/components/ui/form/FormText';
import { BUTTON_COLOR } from '@/constants/button';
import { PAGE_URL } from '@/constants/route';
import { SnackbarContext } from '@/context/snackbarContext';
import { UserResponse } from '@/types/codegen/user/UserResponse';

import style from './index.module.scss';

type Props = {
  userResponse: UserResponse | undefined;
};

export const UserEdit: FC<Props> = ({ userResponse }: Props) => {
  const { push } = useRouter();

  const { addSnackbar } = useContext(SnackbarContext);

  const navigateToUserDetail = () => {
    push(PAGE_URL.USER);
  };

  const handleEditUser = () => {
    addSnackbar('編集が完了しました');
    navigateToUserDetail();
  };

  return (
    <div className={style['user-edit-component']}>
      <div className={style['field']}>
        <div className={style['image']}>
          <div className={style['image-field']}>
            <div className={style['icon']}>
              <CameraIcon />
            </div>
            <label className={style['wrapper']}>
              <input type="file" className={style['field']} />
            </label>
          </div>
        </div>
        <FormText
          title="ニックネーム"
          value={userResponse?.displayUserName ?? ''}
          isRequired={false}
          onChange={() => {}}
        />
        <FormText
          title="Eメール"
          value={userResponse?.email ?? ''}
          isRequired={false}
          onChange={() => {}}
        />
        <FormText
          title="電話番号"
          value={userResponse?.telNumber ?? ''}
          isRequired={false}
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
