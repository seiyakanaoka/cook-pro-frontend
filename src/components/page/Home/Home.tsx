import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FC, useState } from 'react';

import { DishItem } from '@/components/model/dish/DishItem';
import { FilterAction } from '@/components/ui/filter/FilterAction';
import { FilterPanel } from '@/components/ui/filter/FilterPanel';
import { Header } from '@/components/ui/Header';
import { CATEGORY } from '@/constants/category';
import { PAGE_URL } from '@/constants/route';
import { useCategories } from '@/hooks/api/category/useCategories';
import { useDishes } from '@/hooks/api/dish/useDishes';
import { FilterItem } from '@/types/Filter';

import style from './index.module.scss';

export const Home: FC = () => {
  const { push } = useRouter();

  const navigateToDish = (dishId: string) => {
    push(PAGE_URL.DISH + '/' + dishId);
  };

  const {
    dishesResponse,
    dishesSearchResponse,
    dishesSearchParams,
    onChangeDishesParams,
    onChangeDishesSearchParams,
  } = useDishes();

  const { categoriesResponse } = useCategories();

  const onChangeFilterItem = (items: FilterItem[]) => {
    onChangeDishesParams(
      items.filter((item) => item.isCheck).map((item) => item.id)
    );
  };

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChangeDishesSearchParams(e.currentTarget.value);
  };

  const handleClear = () => {
    onChangeDishesSearchParams('');
  };

  const filterItems = categoriesResponse.map((category) => ({
    id: category,
    text: CATEGORY[category],
    isCheck: false,
  }));

  return (
    <div className={style['home-component']}>
      <div className={style['header']}>
        <Header
          searchItems={dishesSearchResponse}
          searchValue={dishesSearchParams?.dishName}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </div>
      <ul className={style['dish-list']}>
        {dishesResponse?.map((dish) => (
          <li
            key={dish.id}
            className={clsx(
              style['dish'],
              dishesResponse?.length % 2 === 0 && style['-even']
            )}
            onClick={() => navigateToDish(dish.id)}
          >
            <DishItem
              image={dish.image.url}
              title={dish.name}
              time={dish.createRequiredTime.toString()}
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
