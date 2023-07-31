'use client';

import clsx from 'clsx';
import { FC } from 'react';

import { DishCategory } from '@/components/model/dish/DishCategory';
import { DishTime } from '@/components/model/dish/DishTime';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';

import style from './index.module.scss';

type Props = {
  dish: {
    images: string[];
    title: string;
    categories: CategoryResponse[];
    time: string;
  };
};

export const DishDetail: FC<Props> = ({ dish }: Props) => {
  const titles = dish.title.split('\n');

  return (
    <div className={style['dish-detail-component']}>
      <div className={style['top']}>
        {dish.images.map((image, i) => (
          <img key={i} src={image} alt="" className={style['image']} />
        ))}
        <ul className={style['image-dot']}>
          {dish.images.map((image, i) => (
            <li key={i} className={clsx(style['dot'], style['-selected'])}></li>
          ))}
        </ul>
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
          {dish.categories.map((category) => (
            <li key={category} className={style['category']}>
              <DishCategory category={category} />
            </li>
          ))}
        </ul>
        <DishTime time={dish.time} />
      </div>
    </div>
  );
};
