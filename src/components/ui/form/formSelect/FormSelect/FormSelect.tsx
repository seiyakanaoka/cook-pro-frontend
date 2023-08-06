import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const FormSelect: FC<Props> = ({}: Props) => {
  return <div className={style['form-select-component']}></div>;
};
