'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FC, useEffect, useState } from 'react';

import { DishItem } from '@/components/model/dish/DishItem';
import { FilterAction } from '@/components/ui/filter/FilterAction';
import { FilterPanel } from '@/components/ui/filter/FilterPanel';
import { Header } from '@/components/ui/Header';
import { CATEGORY } from '@/constants/category';
import { PAGE_URL } from '@/constants/route';
import { useCategories } from '@/hooks/api/category/useCategories';
import { useDishes } from '@/hooks/api/dish/useDishes';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';
import { DishResponse } from '@/types/codegen/dish/DishResponse';
import { DishSearchResponse } from '@/types/codegen/dish/DishSearchResponse';
import { FilterItem } from '@/types/Filter';

import style from './index.module.scss';

export const Home: FC = () => {
  const { push } = useRouter();

  const navigateToDish = (dishId: string) => {
    push(PAGE_URL.DISH + '/' + dishId);
  };

  const { getDishes: _getDishes, getDishesSearch: _getDishesSearch } =
    useDishes();

  const { getCategories: _getCategories } = useCategories();

  const [dishes, setDishes] = useState<DishResponse[] | undefined>();

  const [categories, setCategories] = useState<FilterItem[]>([]);

  const onChangeFilterItem = (items: FilterItem[]) => {
    setCategories(items);
  };

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const [searchItems, setSearchItems] = useState<DishSearchResponse[]>([]);

  const [searchValue, setSearchValue] = useState('');

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleClear = () => {
    setSearchValue('');
  };

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

  useEffect(() => {
    const getDishesSearch = async () => {
      const response = await _getDishesSearch({ dishName: searchValue });
      setSearchItems(response);
    };

    getDishesSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className={style['home-component']}>
      <div className={style['header']}>
        <Header
          searchItems={searchItems}
          searchValue={searchValue}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </div>
      <ul className={style['dish-list']}>
        {dishes?.map((dish) => (
          <li
            key={dish.dishId}
            className={clsx(
              style['dish'],
              dishes?.length % 2 === 0 && style['-even']
            )}
            onClick={() => navigateToDish(dish.dishId)}
          >
            <DishItem
              image={dish.image.dishImageUrl}
              title={dish.dishName}
              time={dish.dishCreateRequiredTime.toString()}
            />
          </li>
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
