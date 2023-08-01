'use client';

import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { UserResponse } from '@/types/codegen/user/UserResponse';

import style from './index.module.scss';

type Props = {
  userResponse: UserResponse | undefined;
};

export const UserEdit: FC<Props> = ({ userResponse }: Props) => {
  return (
    <div className={style['user-edit-component']}>
      <div className={style['top']}>
        <div className={style['image-field']}>
          <img src={userResponse?.image} alt="" className={style['image']} />
        </div>
        <div className={style['user-info']}>
          <p className={style['nickname']}>
            {userResponse?.displayUserName ?? userResponse?.name}
          </p>
          <div className={style['detail']}>
            <p className={style['name']}>{userResponse?.name}</p>
            <p className={style['email']}>{userResponse?.email}</p>
            <p className={style['telephone']}>{userResponse?.telNumber}</p>
          </div>
        </div>
      </div>
      <Button color="primary" text="プロフィール編集" onClick={() => {}} />
    </div>
  );
};
