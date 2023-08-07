import { FC, useState } from 'react';

import { DishCategory } from '@/components/model/dish/DishCategory';
import { Button } from '@/components/ui/Button';
import { FormSelect } from '@/components/ui/form/formSelect/FormSelect';
import { FormText } from '@/components/ui/form/FormText';
import { BUTTON_COLOR } from '@/constants/button';
import { CATEGORY } from '@/constants/category';
import { useFormText } from '@/hooks/useFormText';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';

import style from './index.module.scss';

type Props = {};

type DishFormValues = {
  dishName: string;
  createRequiredTime: string;
  // imageIds: string[];
  // materials: { materialName: string; quantity: string; unit: string }[];
  // category: { categoryId: string; categoryType: string }[];
};

// type Materials = { materialName: string; quantity: string; unit: string }[];

type Categories = {
  categoryId: CategoryResponse;
  categoryType: CategoryResponse;
}[];

export const DishNew: FC<Props> = ({}: Props) => {
  const { fieldValue, onChange } = useFormText<DishFormValues>({
    defaultValues: {
      dishName: { value: '' },
      createRequiredTime: { value: '' },
    },
  });

  const categories = Object.values(CategoryResponse).map((category) => ({
    id: category,
    name: CATEGORY[category],
  }));

  const [selectedCategories, setSelectedCategories] = useState<Categories>([]);

  const onChangeCategory = (id: string) => {
    const newSelectedCategories = selectedCategories.concat([
      {
        categoryId: id as CategoryResponse,
        categoryType: id as CategoryResponse,
      },
    ]);
    setSelectedCategories(newSelectedCategories);
  };

  return (
    <div className={style['dish-new-component']}>
      <h1 className={style['title']}>料理新規登録</h1>
      <div className={style['field']}>
        <FormText
          title="料理名"
          value={fieldValue.dishName}
          onChange={(e) => onChange('dishName', e)}
        />
        <FormText
          title="所要時間"
          value={fieldValue.createRequiredTime}
          onChange={(e) => onChange('createRequiredTime', e)}
        />
        <div className={style['material-field']}></div>
        <FormSelect
          title="材料"
          items={[]}
          selectedValue=""
          onClick={() => {}}
        />
        <div className={style['category-field']}>
          <FormSelect
            title="カテゴリー"
            items={categories}
            selectedValue=""
            onClick={onChangeCategory}
          />
          <ul className={style['list']}>
            {selectedCategories.map((category) => (
              <li key={category.categoryId} className={style['category']}>
                <DishCategory category={category.categoryId} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={style['actions']}>
        <Button text="追加" color={BUTTON_COLOR.primary} onClick={() => {}} />
        <Button text="戻る" color={BUTTON_COLOR.secondary} onClick={() => {}} />
      </div>
    </div>
  );
};
