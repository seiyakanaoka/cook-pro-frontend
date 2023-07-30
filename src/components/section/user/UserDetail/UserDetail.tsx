'use client';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import LogoImage from 'public/twitter_profile_image.png';

import style from './index.module.scss';

type Props = {};

export const UserDetail: FC<Props> = ({}: Props) => {
  return (
    <div className={style['user-detail-component']}>
      <div className={style['top']}>
        <div className={style['image-field']}>
          <img src={LogoImage.src} alt="" className={style['image']} />
        </div>
        <div className={style['user-info']}>
          <p className={style['nickname']}>Seiya</p>
          <div className={style['detail']}>
            <p className={style['name']}>kanaokaseiya</p>
            <p className={style['email']}>hoge@hoge.com</p>
            <p className={style['telephone']}>000-0000-0000</p>
          </div>
        </div>
      </div>
      <Button color="primary" text="プロフィール編集" onClick={() => {}} />
    </div>
  );
};
