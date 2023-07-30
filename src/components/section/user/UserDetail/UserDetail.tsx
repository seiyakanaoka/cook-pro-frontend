'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { PAGE_URL } from '@/constants/route';
import { UserResponse } from '@/types/codegen/user/UserResponse';
import NoImage from 'public/no-image.png';

import style from './index.module.scss';

type Props = {
  user: UserResponse | undefined;
};

export const UserDetail: FC<Props> = ({ user }: Props) => {
  const { push } = useRouter();

  const navigateToEdit = () => {
    push(PAGE_URL.USER + '?status=edit');
  };

  return (
    <div className={style['user-detail-component']}>
      <div className={style['top']}>
        <div className={style['image-field']}>
          <img
            src={user?.image ?? NoImage.src}
            alt=""
            className={clsx(
              style['image'],
              user?.image == undefined && style['-not-image']
            )}
          />
        </div>
        <div className={style['user-info']}>
          <p className={style['nickname']}>
            {user?.displayUserName ?? user?.name}
          </p>
          <div className={style['detail']}>
            <p className={style['name']}>{user?.name}</p>
            <p className={style['email']}>{user?.email}</p>
            <p className={style['telephone']}>{user?.telNumber}</p>
          </div>
        </div>
      </div>
      <Button
        color="primary"
        text="プロフィール編集"
        onClick={navigateToEdit}
      />
    </div>
  );
};
