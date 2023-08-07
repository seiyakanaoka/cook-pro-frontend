import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const FormImage: FC<Props> = ({}: Props) => {
  return <div className={style['form-image-component']}></div>;
};
