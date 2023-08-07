import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { BUTTON_COLOR } from '@/constants/button';
import { PAGE_URL } from '@/constants/route';
import { UserResponse } from '@/types/codegen/user/UserResponse';
import NoImage from 'public/no-image.png';

import style from './index.module.scss';

type Props = {
  userResponse: UserResponse | undefined;
};

export const UserDetail: FC<Props> = ({ userResponse }: Props) => {
  const { push } = useRouter();

  const navigateToEdit = () => {
    push(PAGE_URL.USER + '?status=edit');
  };

  return (
    <div className={style['user-detail-component']}>
      <div className={style['top']}>
        <div className={style['image-field']}>
          <img
            src={userResponse?.image ?? NoImage.src}
            alt=""
            className={clsx(
              style['image'],
              userResponse?.image == undefined && style['-not-image']
            )}
          />
        </div>
        <div className={style['user-info']}>
          {!!userResponse?.displayUserName && (
            <p className={style['nickname']}>{userResponse.displayUserName}</p>
          )}
          <div className={style['detail']}>
            <p className={style['name']}>{userResponse?.name}</p>
            <p className={style['email']}>{userResponse?.email}</p>
            <p className={style['telephone']}>{userResponse?.telNumber}</p>
          </div>
        </div>
      </div>
      <Button
        color={BUTTON_COLOR.PRIMARY}
        text="プロフィール編集"
        onClick={navigateToEdit}
      />
    </div>
  );
};
