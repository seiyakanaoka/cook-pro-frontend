import { FC } from 'react';

import { FormSelect } from '@/components/ui/form/formSelect/FormSelect';
import { FormText } from '@/components/ui/form/FormText';

import style from './index.module.scss';

type Props = {};

export const DishNew: FC<Props> = ({}: Props) => {
  return (
    <div className={style['dish-new-component']}>
      <h1 className={style['title']}>料理新規登録</h1>
      <FormText title="料理名" value="" onChange={() => {}} />
      <FormSelect
        title="所要時間"
        items={[]}
        selectedValue=""
        onClick={() => {}}
      />
    </div>
  );
};
