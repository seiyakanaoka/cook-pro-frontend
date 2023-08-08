import { useOutsideClick } from '@chakra-ui/react';
import { FC, useRef, useState } from 'react';

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
  errorMessage?: string | undefined;
  onClick: (id: string) => void;
};

export const FormSelectDishCategory: FC<Props> = ({
  title,
  isRequired,
  categories,
  selectedCategories,
  placeholder = '入力してください',
  errorMessage,
  onClick,
}: Props) => {
  const items = categories.map((category) => ({
    id: category,
    name: CATEGORY[category],
  }));

  const selectedItems = selectedCategories.map((category) => ({
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
    onClick(id);
    onClose();
  };

  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: ref,
    handler: onClose,
  });

  return (
    <div className={style['form-select-dish-category-component']}>
      {!!title && <FormTitle title={title} isRequired={isRequired} />}
      <div className={style['field']}>
        <ul className={style['category-list']}>
          {selectedCategories.length === 0
            ? placeholder
            : selectedCategories.map((selectedCategory) => (
                <li key={selectedCategory} className={style['category']}>
                  <DishCategory category={selectedCategory} />
                </li>
              ))}
        </ul>
        <div className={style['line']} />
        <div className={style['add-action']}>
          <button className={style['action']} onClick={onOpen}>
            追加
          </button>
        </div>
        {isOpen && (
          <div className={style['panel']} ref={ref}>
            <FormSelectPlate
              items={items}
              selectedItems={selectedItems}
              onClick={handleClick}
            />
          </div>
        )}
      </div>
      {!!errorMessage && <p className={style['message']}>{errorMessage}</p>}
    </div>
  );
};
