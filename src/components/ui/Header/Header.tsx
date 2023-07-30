'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ChangeEventHandler, FC } from 'react';

import LogoutIcon from '@/assets/icons/logout.svg';
import { PAGE_URL } from '@/constants/route';
import { useAuth } from '@/hooks/useAuth';
import LogoImage from 'public/twitter_profile_image.png';

import { FormSuggest } from '../form/FormSuggest';

import style from './index.module.scss';

type Props = {
  searchItems?: { id: string; name: string }[];
  searchValue?: string;
  onSearch?: ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
};

export const Header: FC<Props> = ({
  searchItems,
  searchValue,
  onSearch,
  onClear,
}: Props) => {
  const { logout } = useAuth();

  const { push } = useRouter();

  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    push(PAGE_URL.BEFORE);
  };

  const isHome = pathname === PAGE_URL.HOME;

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
      {isHome && (
        <FormSuggest
          items={searchItems ?? []}
          value={searchValue ?? ''}
          placeholder="料理名で検索"
          onSearch={onSearch ?? (() => {})}
          onClear={onClear ?? (() => {})}
        />
      )}
    </div>
  );
};
