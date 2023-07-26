'use client';

import clsx from 'clsx';
import { FC, Fragment, useEffect, useState } from 'react';

import { DishItem } from '@/components/model/dish/DishItem';
import { FilterAction } from '@/components/ui/filter/FilterAction';
import { FilterPanel } from '@/components/ui/filter/FilterPanel';
import { useCategories } from '@/hooks/api/category/useCategories';
import { useDishes } from '@/hooks/api/dish/useDishes';
import { DishResponse } from '@/types/codegen/dish/DishResponse';

import style from './index.module.scss';

export const Home: FC = () => {
  const { getDishes: _getDishes } = useDishes();

  const { getCategories: _getCategories } = useCategories();

  const [dishes, setDishes] = useState<DishResponse[] | undefined>();

  const [categories, setCategories] = useState<
    { text: string; isCheck: boolean }[]
  >([]);

  useEffect(() => {
    const getDishes = async () => {
      const response = await _getDishes();
      setDishes(response);
    };

    getDishes();

    const getCategories = async () => {
      const response = await _getCategories();
      setCategories(
        response.map((category) => ({
          text: category.toString(),
          isCheck: false,
        }))
      );
    };

    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onClickFilterItem = (text: string) => {
    const newCategories = categories.map((category) => {
      if (text === category.text) {
        const newItem = { ...category, isCheck: !category.isCheck };
        return newItem;
      }
      return category;
    });
    setCategories(newCategories);
  };

  return (
    <div className={style['home-component']}>
      <ul className={style['dish-list']}>
        {dishes?.map((dish) => (
          <Fragment key={dish.dishId}>
            <li
              className={clsx(
                style['dish'],
                dishes?.length % 2 === 0 && style['-even']
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
      {/* TODO: 統一できないか考える */}
      <div className={style['icon']}>
        <FilterAction onClick={onOpen} />
      </div>
      <FilterPanel
        isOpen={isOpen}
        items={categories}
        onClick={onClickFilterItem}
        onClose={onClose}
      />
    </div>
  );
};
