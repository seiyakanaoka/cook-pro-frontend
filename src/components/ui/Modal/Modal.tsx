import { FC } from 'react';

import style from './index.module.scss';

type Props = {};

export const Modal: FC<Props> = ({}: Props) => {
  return <div className={style['modal-component']}></div>;
};
