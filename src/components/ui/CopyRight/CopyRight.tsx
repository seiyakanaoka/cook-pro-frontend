import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const CopyRight: FC<Props> = ({}: Props) => {
  return <div className={style['copyright-component']}>©️ Cook Pro 2023</div>;
};
