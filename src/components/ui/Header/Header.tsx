'use client';

import { ChangeEventHandler, FC } from 'react';

import LogoImage from 'public/twitter_profile_image.png';

import { FormSearch } from '../form/FormSearch';

import style from './index.module.scss';

type Props = {
  userImage: string;
  value: string;
  onSearch: ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
};

export const Header: FC<Props> = ({
  userImage,
  value,
  onSearch,
  onClear,
}: Props) => {
  return (
    <div className={style['header-component']}>
      <div className={style['field']}>
        <div className={style['logo-field']}>
          <img src={LogoImage.src} alt="" className={style['logo']} />
          <p className={style['text']}>Cook Pro</p>
        </div>
        <img src={userImage} alt="" className={style['image']} />
      </div>
      <FormSearch
        value={value}
        placeholder="料理名で検索"
        onSearch={onSearch}
        onClear={onClear}
      />
    </div>
  );
};
