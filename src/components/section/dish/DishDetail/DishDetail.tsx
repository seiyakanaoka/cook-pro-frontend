'use client';

import { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './dot.scss';

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

  // 画像の速さとスライド方法の指定
  const properties = {
    width: '100%',
    autoplay: false,
    transitionDuration: 300,
    arrows: false,
    infinite: true,
    easing: 'ease',
    // ドットを作成
    indicators: () => (
      <div className="image-dot">
        <div className="dot"></div>
      </div>
    ),
  };

  return (
    <div className={style['dish-detail-component']}>
      <div className={style['top']}>
        <Slide {...properties}>
          {dish.images.map((image, i) => (
            <div key={i} className={style['image-item']}>
              <img src={image} alt="" className={style['image']} />
            </div>
          ))}
        </Slide>
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
