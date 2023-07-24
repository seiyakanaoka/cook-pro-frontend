'use client';

import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FC } from 'react';

import LogoutIcon from '@/assets/icons/logout.svg';
import { PAGE_URL } from '@/constants/route';
import { useAuth } from '@/hooks/useAuth';
import LogoImage from 'public/twitter_profile_image.png';

import { FormSearch } from '../form/FormSearch';

import style from './index.module.scss';

type Props = {
  value: string;
  onSearch: ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
};

export const Header: FC<Props> = ({ value, onSearch, onClear }: Props) => {
  const { logout } = useAuth();

  const { push } = useRouter();

  const handleLogout = async () => {
    await logout();
    push(PAGE_URL.BEFORE);
  };

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
