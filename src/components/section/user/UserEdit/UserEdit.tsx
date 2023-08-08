import { useRouter } from 'next/navigation';
import { FC, useContext } from 'react';

import { Button } from '@/components/ui/Button';
import { FormImage } from '@/components/ui/form/FormImage';
import { FormText } from '@/components/ui/form/FormText';
import { BUTTON_COLOR } from '@/constants/button';
import { MIME_TYPE } from '@/constants/image';
import { PAGE_URL } from '@/constants/route';
import { SNACKBAR_STATUS } from '@/constants/snackbar';
import { USER_FORM_VALUES } from '@/constants/validation/user';
import { SnackbarContext } from '@/context/snackbarContext';
import { useImageRequest } from '@/hooks/api/image/useImageRequest';
import { useUser } from '@/hooks/api/user/useUser';
import { useUserRequest } from '@/hooks/api/user/useUserRequest';
import { useCognito } from '@/hooks/aws/useCognito';
import { useFormText } from '@/hooks/useFormText';
import { PutUserRequest } from '@/types/codegen/user/PutUserRequest';
import { UserResponse } from '@/types/codegen/user/UserResponse';
import { UserEditAttributeKeyValue, UserFormValues } from '@/types/User';
import { base64ToBlob } from '@/utils/image';

import style from './index.module.scss';

type Props = {
  userResponse: UserResponse | undefined;
};

export const UserEdit: FC<Props> = ({ userResponse }: Props) => {
  const { push } = useRouter();

  const { addSnackbar } = useContext(SnackbarContext);

  const { updateCognitoUser } = useCognito<UserEditAttributeKeyValue>();

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

  const handleEditUser = async (
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

    const attribute: UserEditAttributeKeyValue = {
      email: fieldValue.email ?? '',
      phone_number: `+${fieldValue.telNumber ?? ''}`,
    };

    try {
      await updateUser(requestBody);
      if (userResponse?.name) {
        await updateCognitoUser(attribute);
      }
      await mutate();
      addSnackbar('編集が完了しました');
      navigateToUserDetail();
    } catch (err) {
      addSnackbar('編集できませんでした', SNACKBAR_STATUS.ABNORMAL);
      console.error(err);
    }
  };

  const handleClick = async () => {
    const userImage = fieldValue.userImage;

    const displayName = fieldValue.nickname;

    if (typeof userImage === 'undefined' || !userImage.includes('image/png')) {
      handleEditUser(displayName, userImage);
      return;
    }

    let imageId: string;

    const blob = base64ToBlob(userImage, 'image/png');

    if (typeof blob === 'undefined') return;

    imageId = await uploadImage(blob);

    await handleEditUser(displayName, imageId);
  };

  const handleChangeUserImage = (value: string) => {
    onChange('userImage', value);
  };

  const handleClearUserImage = () => {
    onChange('userImage', '');
  };

  const handleFailure = (message: string) => {
    addSnackbar(message, SNACKBAR_STATUS.ABNORMAL);
  };

  return (
    <div className={style['user-edit-component']}>
      <div className={style['field']}>
        <div className={style['image']}>
          <FormImage
            image={fieldValue.userImage}
            mimeTypes={[MIME_TYPE.PNG, MIME_TYPE.JPEG]}
            onChange={handleChangeUserImage}
            onClear={handleClearUserImage}
            onFailure={handleFailure}
          />
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
          isRequired
          errorMessage={errors?.email}
          onChange={(e) => onChange('email', e)}
        />
        <FormText
          title="電話番号"
          value={fieldValue.telNumber ?? ''}
          isRequired
          errorMessage={errors?.telNumber}
          onChange={(e) => onChange('telNumber', e)}
        />
      </div>
      <div className={style['actions']}>
        <Button
          color={BUTTON_COLOR.PRIMARY}
          text="完了"
          isDisabled={!isValid}
          onClick={handleClick}
        />
        <Button
          color={BUTTON_COLOR.SECONDARY}
          text="戻る"
          onClick={navigateToUserDetail}
        />
      </div>
    </div>
  );
};
