import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ChangeEventHandler, FC } from 'react';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import LogoutIcon from '@/assets/icons/logout.svg';
import { FormSuggest } from '@/components/ui/form/FormSuggest';
import { PAGE_URL } from '@/constants/route';
import { useCognito } from '@/hooks/aws/useCognito';
import LogoImage from 'public/twitter_profile_image.png';

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
  const { logout } = useCognito();

  const { asPath, push } = useRouter();

  const navigateToDish = (dishId: string) => {
    push(PAGE_URL.DISH + '/' + dishId);
  };

  const handleBack = () => {
    push(PAGE_URL.HOME);
  };

  const handleLogout = async () => {
    await logout();
    await push(PAGE_URL.BEFORE);
  };

  const isHome = asPath === PAGE_URL.HOME;

  const isShowBackAction =
    asPath === PAGE_URL.USER || asPath?.includes(PAGE_URL.DISH);

  return (
    <div className={style['header-component']}>
      <div className={style['header-top']}>
        {isShowBackAction && (
          <div
            className={clsx(style['icon'], style['-back'])}
            onClick={handleBack}
          >
            <ArrowLeftIcon />
          </div>
        )}
        <div className={style['field']}>
          <img
            src={LogoImage.src}
            alt=""
            loading="lazy"
            className={style['logo']}
          />
        </div>
        <div
          className={clsx(style['icon'], style['-logout'])}
          onClick={handleLogout}
        >
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
          onClick={navigateToDish}
        />
      )}
    </div>
  );
};
