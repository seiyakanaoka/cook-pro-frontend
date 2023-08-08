import clsx from 'clsx';
import { FC } from 'react';

import style from './index.module.scss';

type Props = {
  isBlurred?: boolean;
};

export const Loading: FC<Props> = ({ isBlurred = false }: Props) => {
  return (
    <div
      className={clsx(
        style['loading-component'],
        isBlurred && style['-blurred']
      )}
    >
      <div className={style['loading']}>
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>
    </div>
  );
};
