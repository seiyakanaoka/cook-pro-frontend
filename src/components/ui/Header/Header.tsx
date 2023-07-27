'use client';

import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FC, useEffect, useState } from 'react';

import LogoutIcon from '@/assets/icons/logout.svg';
import { PAGE_URL } from '@/constants/route';
import { useDishes } from '@/hooks/api/dish/useDishes';
import { useAuth } from '@/hooks/useAuth';
import { DishSearchResponse } from '@/types/codegen/dish/DishSearchResponse';
import LogoImage from 'public/twitter_profile_image.png';

import { FormSuggest } from '../form/FormSuggest';

import style from './index.module.scss';

export const Header: FC = () => {
  const { logout } = useAuth();

  const { push } = useRouter();

  const { getDishesSearch: _getDishesSearch } = useDishes();

  const [searchValue, setSearchValue] = useState('');

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleClear = () => {
    setSearchValue('');
  };

  const [searchItems, setSearchItems] = useState<DishSearchResponse[]>([]);

  const handleLogout = async () => {
    await logout();
    push(PAGE_URL.BEFORE);
  };

  useEffect(() => {
    const getDishesSearch = async () => {
      const response = await _getDishesSearch({ dishName: searchValue });
      setSearchItems(response);
    };

    getDishesSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

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
      <FormSuggest
        items={searchItems}
        value={searchValue}
        placeholder="料理名で検索"
        onSearch={handleSearch}
        onClear={handleClear}
      />
    </div>
  );
};
