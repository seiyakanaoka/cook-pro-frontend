'use client';

import clsx from 'clsx';
import { FC, Fragment, useState } from 'react';

import { DishItem } from '@/components/ui/dish/DishItem';
import { Filter } from '@/components/ui/filter/Filter';
import { FilterPanel } from '@/components/ui/filter/FilterPanel';
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
  const [items, setItems] = useState([
    { text: 'text1', isCheck: true },
    { text: 'text2', isCheck: false },
    { text: 'text3', isCheck: false },
    { text: 'text4', isCheck: true },
    { text: 'text5', isCheck: false },
    { text: 'text6', isCheck: false },
    { text: 'text7', isCheck: false },
    { text: 'text8', isCheck: false },
    { text: 'text9', isCheck: false },
    { text: 'text10', isCheck: false },
    { text: 'text11', isCheck: false },
    { text: 'text12', isCheck: false },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onClickFilterItem = (text: string) => {
    const newItems = items.map((item) => {
      if (text === item.text) {
        const newItem = { ...item, isCheck: !item.isCheck };
        return newItem;
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <div className={style['home-component']}>
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
      <div className={style['icon']}>
        <Filter onClick={onOpen} />
      </div>
      {isOpen && (
        <div className={style['filter']}>
          <FilterPanel
            items={items}
            onClick={onClickFilterItem}
            onClose={onClose}
          />
        </div>
      )}
    </div>
  );
};
