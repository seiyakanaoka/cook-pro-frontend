'use client';

import { ChangeEventHandler, FC } from 'react';

import LogoImage from 'public/twitter_profile_image.png';

import { FormTextField } from '../form/FormTextField';

import style from './index.module.scss';

type Props = {
  userImage: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const Header: FC<Props> = ({ userImage, value, onChange }: Props) => {
  return (
    <div className={style['header-component']}>
      <img src={userImage} alt="" className={style['image']} />
      <FormTextField value={value} onChange={onChange} />
      <img src={LogoImage.src} alt="" className={style['image']} />
    </div>
  );
};
