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
      <div className={style['field']}>
        <div className={style['logo-field']}>
          <img src={LogoImage.src} alt="" className={style['logo']} />
          <p className={style['text']}>Cook Pro</p>
        </div>
        <img src={userImage} alt="" className={style['image']} />
      </div>
      <FormTextField
        value={value}
        placeholder="料理名で検索"
        onChange={onChange}
      />
    </div>
  );
};
