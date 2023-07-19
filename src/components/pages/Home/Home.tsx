'use client';

import clsx from 'clsx';
import { FC, Fragment } from 'react';

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
    {
      dishId: 'f59fa544-abfe-423d-a20c-2799eed2d608',
      dishName: '季節の野菜たっぷりのカレーadsddad',
      image: FoodImage.src,
      dishCreateRequiredTime: 20,
    },
    {
      dishId: 'f59fa544-abfe-423d-a20c-2799eed2d609',
      dishName: '季節の野菜たっぷりのカレー',
      image: FoodImage.src,
      dishCreateRequiredTime: 20,
    },
    {
      dishId: 'f59fa544-abfe-423d-a20c-2799eed2d6010',
      dishName: '季節の野菜たっぷりのカレーadsddad',
      image: FoodImage.src,
      dishCreateRequiredTime: 20,
    },
    {
      dishId: 'f59fa544-abfe-423d-a20c-2799eed2d6011',
      dishName: '季節の野菜たっぷりのカレー',
      image: FoodImage.src,
      dishCreateRequiredTime: 20,
    },
  ],
};

export const Home: FC = () => {
  return (
    <div className={style['home-component']}>
      {/* <FormCheckbox text="text" isCheck={false} /> */}
      <ul className={style['dish-list']}>
        {dishes.dishes.map((dish) => (
          <Fragment key={dish.dishId}>
            <li
              className={clsx(
                style['dish'],
                dishes.dishes.length % 2 === 0 && style['-even']
              )}
            >
              <DishItem
                image={dish.image}
                title={dish.dishName}
                time={dish.dishCreateRequiredTime.toString()}
              />
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};
