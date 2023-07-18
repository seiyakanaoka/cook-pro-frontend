'use client';

import { FC } from 'react';

import LogoImage from 'public/twitter_profile_image.png';

import { FormTextField } from '../form/FormTextField';

import style from './index.module.scss';

type Props = {
  userImage: string;
};

export const Header: FC<Props> = ({ userImage }: Props) => {
  return (
    <div className={style['header-component']}>
      <img src={userImage} alt="" className={style['image']} />
      <FormTextField value="" onChange={() => {}} />
      <img src={LogoImage.src} alt="" className={style['image']} />
    </div>
  );
};
