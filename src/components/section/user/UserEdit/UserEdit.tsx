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
import { useImageRequest } from '@/hooks/api/image/useImageRequest';
import { useUser } from '@/hooks/api/user/useUser';
import { useUserRequest } from '@/hooks/api/user/useUserRequest';
import { useFormText } from '@/hooks/useFormText';
import { PutUserRequest } from '@/types/codegen/user/PutUserRequest';
import { UserResponse } from '@/types/codegen/user/UserResponse';
import { UserFormValues } from '@/types/User';
import { base64ToBlob } from '@/utils/image';

import style from './index.module.scss';

type Props = {
  userResponse: UserResponse | undefined;
};

export const UserEdit: FC<Props> = ({ userResponse }: Props) => {
  const { push } = useRouter();

  const { addSnackbar } = useContext(SnackbarContext);

  const { updateUser } = useUserRequest();

  const { mutate } = useUser();

  const { uploadImage } = useImageRequest();

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

  const _handleEditUser = async (
    displayName?: string | undefined,
    imageId?: string | undefined
  ) => {
    const requestBody: PutUserRequest = {
      email: fieldValue.email ?? '',
      telNumber: fieldValue.telNumber ?? '',
    };
    if (!!displayName) {
      requestBody.displayName = displayName;
    }
    if (!!imageId) {
      requestBody.imageId = imageId;
    }
    try {
      await updateUser(requestBody);
      await mutate();
      addSnackbar('編集が完了しました');
      navigateToUserDetail();
    } catch (err) {
      addSnackbar('編集できませんでした', SNACKBAR_STATUS.ABNORMAL);
      console.error(err);
    }
  };

  const handleEditUser = async () => {
    const userImage = fieldValue.userImage;

    const displayName = fieldValue.nickname;

    if (typeof userImage === 'undefined' || !userImage.includes('image/png')) {
      _handleEditUser(displayName, userImage);
      return;
    }

    let imageId: string;

    const blob = base64ToBlob(userImage, 'image/png');

    if (typeof blob === 'undefined') return;

    imageId = await uploadImage(blob);

    _handleEditUser(displayName, imageId);
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
