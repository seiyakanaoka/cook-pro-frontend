'use client';

import clsx from 'clsx';
import { FC, Fragment, useEffect, useState } from 'react';

import { DishItem } from '@/components/model/dish/DishItem';
import { FilterAction } from '@/components/ui/filter/FilterAction';
import { FilterPanel } from '@/components/ui/filter/FilterPanel';
import { CATEGORY } from '@/constants/category';
import { useCategories } from '@/hooks/api/category/useCategories';
import { useDishes } from '@/hooks/api/dish/useDishes';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';
import { DishResponse } from '@/types/codegen/dish/DishResponse';
import { FilterItem } from '@/types/Filter';

import style from './index.module.scss';

export const Home: FC = () => {
  const { getDishes: _getDishes } = useDishes();

  const { getCategories: _getCategories } = useCategories();

  const [dishes, setDishes] = useState<DishResponse[] | undefined>();

  const [categories, setCategories] = useState<FilterItem[]>([]);

  const filterItems = categories.map((category) => ({
    id: category.id,
    text: CATEGORY[category.id as CategoryResponse],
    isCheck: category.isCheck,
  }));

  useEffect(() => {
    const getDishes = async () => {
      const response = await _getDishes({
        categories: categories
          .filter((category) => category.isCheck)
          .map((category) => category.id),
      });
      setDishes(response);
    };
    getDishes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await _getCategories();
      setCategories(
        response.map((category) => ({
          id: category,
          text: CATEGORY[category],
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

  const onChangeFilterItem = (items: FilterItem[]) => {
    setCategories(items);
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
                image={dish.image.dishImageUrl}
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
        items={filterItems}
        onChange={onChangeFilterItem}
        onClose={onClose}
      />
    </div>
  );
};
