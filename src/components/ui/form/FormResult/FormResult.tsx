import { FC } from 'react';

import { FormTitle } from '../FormTitle';

import style from './index.module.scss';

type Props = { title: string; result: string };

export const FormResult: FC<Props> = ({ title, result }: Props) => {
  return (
    <div className={style['form-result']}>
      <FormTitle title={title} isRequired={false} />
      <p className={style['result']}>{result}</p>
    </div>
  );
};
