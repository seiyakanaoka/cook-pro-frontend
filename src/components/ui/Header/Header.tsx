'use client';

import { ChangeEventHandler, FC } from 'react';

import LogoutIcon from '@/assets/icons/logout.svg';
import LogoImage from 'public/twitter_profile_image.png';

import { FormSearch } from '../form/FormSearch';

import style from './index.module.scss';

type Props = {
  value: string;
  onSearch: ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
};

export const Header: FC<Props> = ({ value, onSearch, onClear }: Props) => {
  const handleLogout = () => {};

  return (
    <div className={style['header-component']}>
      <div className={style['header-top']}>
        <div className={style['field']}>
          <img src={LogoImage.src} alt="" className={style['logo']} />
        </div>
        <div className={style['icon']} onClick={handleLogout}>
          <LogoutIcon />
        </div>
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
