'use client';

import { FC } from 'react';

import { DishItem } from '@/components/ui/dish/DishItem';
import FoodImage from 'public/food-1.png';

import style from './index.module.scss';

const dishes = {
  dishes: [
    {
      dishId: 'f59fa544-abfe-423d-a20c-2799eed2d606',
      dishName: '季節の野菜たっぷりのカレー',
      image: FoodImage.src,
      dishCreateRequiredTime: 20,
    },
    {
      dishId: 'f59fa544-abfe-423d-a20c-2799eed2d607',
      dishName: '季節の野菜たっぷりのカレー',
      image: FoodImage.src,
      dishCreateRequiredTime: 20,
    },
  ],
};

export const Home: FC = () => {
  return (
    <div className={style['home-component']}>
      <ul className={style['dish-list']}>
        {dishes.dishes.map((dish) => (
          <li key={dish.dishId} className={style['dish']}>
            <DishItem
              image={dish.image}
              title={dish.dishName}
              time={dish.dishCreateRequiredTime.toString()}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
