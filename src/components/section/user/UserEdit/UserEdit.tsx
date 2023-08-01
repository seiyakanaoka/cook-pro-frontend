'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FC, useContext } from 'react';

import ClearIcon from '@/assets/icons/all-clear.svg';
import CameraIcon from '@/assets/icons/camera.svg';
import { Button } from '@/components/ui/Button';
import { FormText } from '@/components/ui/form/FormText';
import { BUTTON_COLOR } from '@/constants/button';
import { PAGE_URL } from '@/constants/route';
import { SNACKBAR_STATUS } from '@/constants/snackbar';
import { USER_FORM_VALUES } from '@/constants/validation/user';
import { SnackbarContext } from '@/context/snackbarContext';
import { useFormText } from '@/hooks/useFormText';
import { UserResponse } from '@/types/codegen/user/UserResponse';
import { UserFormValues } from '@/types/User';

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

  const defaultValues = {
    userImage: { value: userResponse?.image ?? '' },
    nickname: {
      value: userResponse?.displayUserName ?? '',
      validate: USER_FORM_VALUES.nickname?.validate,
    },
    email: {
      value: userResponse?.email ?? '',
      validate: USER_FORM_VALUES.email?.validate,
    },
    telNumber: {
      value: userResponse?.telNumber ?? '',
      validate: USER_FORM_VALUES.telNumber?.validate,
    },
  };

  const {
    fieldValue,
    fieldState: { errors, isValid },
    onChange,
  } = useFormText<UserFormValues>({
    defaultValues,
  });

  const hasNotUserImage = !fieldValue.userImage;

  const handleEditUser = () => {
    console.log('fieldValue : ', fieldValue);
    addSnackbar('編集が完了しました');
    navigateToUserDetail();
  };

  const handleClearUserImage = () => {
    onChange('userImage', '');
  };

  const handleChangeUserImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const blob = e.target.files?.[0];
    if (typeof blob === 'undefined') {
      addSnackbar(
        '画像をアップロードできませんでした',
        SNACKBAR_STATUS.ABNORMAL
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result !== 'string') {
        addSnackbar(
          '画像をアップロードできませんでした',
          SNACKBAR_STATUS.ABNORMAL
        );
        return;
      }
      onChange('userImage', result);
    };
    reader.readAsDataURL(blob);
  };

  return (
    <div className={style['user-edit-component']}>
      <div className={style['field']}>
        <div className={style['image']}>
          <div
            className={clsx(
              style['image-field'],
              hasNotUserImage && style['-not-selected']
            )}
          >
            {hasNotUserImage ? (
              <label className={style['wrapper']}>
                <span className={style['icon']}>
                  <CameraIcon />
                </span>
                <input
                  type="file"
                  className={style['field']}
                  onChange={handleChangeUserImage}
                />
              </label>
            ) : (
              <>
                <div className={style['icon']} onClick={handleClearUserImage}>
                  <ClearIcon />
                </div>
                <img
                  src={fieldValue.userImage}
                  alt=""
                  className={style['field']}
                />
              </>
            )}
          </div>
        </div>
        <FormText
          title="ニックネーム"
          value={fieldValue.nickname ?? ''}
          isRequired={false}
          errorMessage={errors?.nickname}
          onChange={(e) => onChange('nickname', e)}
        />
        <FormText
          title="Eメール"
          value={fieldValue.email ?? ''}
          isRequired={false}
          errorMessage={errors?.email}
          onChange={(e) => onChange('email', e)}
        />
        <FormText
          title="電話番号"
          value={fieldValue.telNumber ?? ''}
          isRequired={false}
          errorMessage={errors?.telNumber}
          onChange={(e) => onChange('telNumber', e)}
        />
      </div>
      <div className={style['actions']}>
        <Button
          color={BUTTON_COLOR.primary}
          text="完了"
          isDisabled={!isValid}
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
