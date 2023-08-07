import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const DishEdit: FC<Props> = ({}: Props) => {
  return <div className={style['dish-edit-component']}></div>;
};
