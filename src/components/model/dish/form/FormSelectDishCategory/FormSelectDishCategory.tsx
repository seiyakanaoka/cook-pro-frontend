import { FC, useState } from 'react';

import { FormSelectPlate } from '@/components/ui/form/formSelect/FormSelectPlate';
import { FormTitle } from '@/components/ui/form/FormTitle';
import { CATEGORY } from '@/constants/category';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';

import { DishCategory } from '../../DishCategory';

import style from './index.module.scss';

type Props = {
  title?: string;
  isRequired?: boolean;
  categories: CategoryResponse[];
  selectedCategories: CategoryResponse[];
  placeholder?: string;
  onClick: (ids: string[]) => void;
};

export const FormSelectDishCategory: FC<Props> = ({
  title,
  isRequired,
  categories,
  selectedCategories,
  placeholder = '入力してください',
  onClick,
}: Props) => {
  const items = categories.map((category) => ({
    id: category,
    name: CATEGORY[category],
  }));

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleClick = (id: string) => {
    const newCategories = selectedCategories.concat(id as CategoryResponse);
    onClick(newCategories);
    onClose();
  };

  return (
    <div className={style['form-select-dish-category-component']}>
      {!!title && <FormTitle title={title} isRequired={isRequired} />}
      <div className={style['field']} onClick={onOpen}>
        <ul className={style['category-list']}>
          {categories.length === 0
            ? placeholder
            : categories.map((category) => (
                <li key={category} className={style['category']}>
                  <DishCategory category={category} />
                </li>
              ))}
        </ul>
        <span className={style['icon']}></span>
        {isOpen && (
          <div className={style['panel']}>
            <FormSelectPlate items={items} onClick={handleClick} />
          </div>
        )}
      </div>
    </div>
  );
};
