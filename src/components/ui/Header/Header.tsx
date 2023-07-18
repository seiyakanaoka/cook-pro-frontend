'use client';

import { FC } from 'react';

import LogoImage from 'public/twitter_profile_image.png';

import { FormTextField } from '../form/FormTextField';

import style from './index.module.scss';

type Props = {};

export const Header: FC<Props> = ({}: Props) => {
  return (
    <div className={style['header-component']}>
      <img src={LogoImage.src} alt="" />
      <FormTextField value="" onChange={() => {}} />
    </div>
  );
};
