import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { BUTTON_COLOR } from '@/constants/button';
import { ID_TOKEN_KEY } from '@/constants/cookie';
import { PAGE_URL } from '@/constants/route';

import style from './index.module.scss';

type Props = {};

export const NotFound: FC<Props> = ({}: Props) => {
  const cookie = parseCookies();

  const { push } = useRouter();

  const hasToken = !!cookie[ID_TOKEN_KEY];

  const buttonText = hasToken ? 'ホームヘ' : 'トップヘ';

  const buttonAction = hasToken
    ? () => push(PAGE_URL.HOME)
    : () => push(PAGE_URL.BEFORE);

  return (
    <div className={style['not-found-component']}>
      <div className={style['explanation']}>
        <h1 className={style['title']}>404</h1>
        <p className={style['description']}>
          お探しのページは見つかりませんでした
        </p>
      </div>
      <Button
        text={buttonText}
        color={BUTTON_COLOR.secondary}
        onClick={buttonAction}
      />
    </div>
  );
};
