'use client';

import clsx from 'clsx';
import { FC } from 'react';

import { DishCategory } from '@/components/model/dish/DishCategory';
import { DishTime } from '@/components/model/dish/DishTime';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';
import DishImage from 'public/food-1.png';

import style from './index.module.scss';

type Props = {};

export const DishDetail: FC<Props> = ({}: Props) => {
  const title = '【マネしてほしい料理！！】\n最高のメインディッシュ';

  const titles = title.split('\n');

  return (
    <div className={style['dish-detail-component']}>
      <div className={style['top']}>
        <img src={DishImage.src} alt="" className={style['image']} />
        <div className={style['image-dot']}>
          <div className={style['dot']}></div>
          <div className={clsx(style['dot'], style['-selected'])}></div>
          <div className={style['dot']}></div>
        </div>
      </div>
      <div className={style['bottom']}>
        <div className={style['title-field']}>
          {titles.map((text, i) => (
            <p className={style['title']} key={`${i}-${text}`}>
              {text}
            </p>
          ))}
        </div>
        <ul className={style['category-field']}>
          <li className={style['category']}>
            <DishCategory category={CategoryResponse.JAPAN_FOOD} />
          </li>
          <li className={style['category']}>
            <DishCategory category={CategoryResponse.MEAT_DISH} />
          </li>
          <li className={style['category']}>
            <DishCategory category={CategoryResponse.FISH_DISH} />
          </li>
          <li className={style['category']}>
            <DishCategory category={CategoryResponse.SALAD} />
          </li>
        </ul>
        <DishTime time="20" />
      </div>
    </div>
  );
};
