import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const DishNew: FC<Props> = ({}: Props) => {
  return <div className={style['dish-new-component']}></div>;
};
