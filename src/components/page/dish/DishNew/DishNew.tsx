import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { DishCategory } from '@/components/model/dish/DishCategory';
import { Button } from '@/components/ui/Button';
import { FormSelect } from '@/components/ui/form/formSelect/FormSelect';
import { FormText } from '@/components/ui/form/FormText';
import { FormTextField } from '@/components/ui/form/FormTextField';
import { BUTTON_COLOR } from '@/constants/button';
import { CATEGORY } from '@/constants/category';
import {
  MATERIAL,
  MATERIAL_CHANGE_VALUE,
  MaterialChangeValue,
} from '@/constants/material';
import { PAGE_URL } from '@/constants/route';
import { useFormText } from '@/hooks/useFormText';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';
import { PostCategoryRequest } from '@/types/codegen/category/PostCategoryRequest';
import { PostDishRequest } from '@/types/codegen/dish/PostDishRequest';
import { MaterialUnitResponse } from '@/types/codegen/material/MaterialUnitResponse';
import { PostMaterialRequest } from '@/types/codegen/material/PostMaterialRequest';
import { DishFormValues } from '@/types/Dish';

import style from './index.module.scss';

export const DishNew: FC = () => {
  const { push } = useRouter();

  const { fieldValue, onChange } = useFormText<DishFormValues>({
    defaultValues: {
      dishName: { value: '' },
      createRequiredTime: { value: '' },
    },
  });

  const materialUnits = Object.values(MaterialUnitResponse).map(
    (materialUnit) => ({
      id: materialUnit,
      name: MATERIAL[materialUnit],
    })
  );

  const defaultMaterial = {
    id: crypto.randomUUID(),
    materialName: '',
    quantity: '',
    unit: '',
  };

  const [selectedMaterials, setSelectedMaterials] = useState<
    ({ id: string } & PostMaterialRequest)[]
  >([defaultMaterial]);

  const addMaterial = () => {
    setSelectedMaterials(selectedMaterials.concat([defaultMaterial]));
  };

  const onChangeMaterial = (
    id: string,
    value: string,
    type: MaterialChangeValue
  ) => {
    const newSelectedMaterial = selectedMaterials.map((selectedMaterial) => {
      if (selectedMaterial.id !== id) {
        return selectedMaterial;
      }
      switch (type) {
        case MATERIAL_CHANGE_VALUE.NAME: {
          return { ...selectedMaterial, materialName: value };
        }
        case MATERIAL_CHANGE_VALUE.QUANTITY: {
          return { ...selectedMaterial, quantity: value };
        }
        case MATERIAL_CHANGE_VALUE.UNIT: {
          return { ...selectedMaterial, unit: value };
        }
      }
    });
    setSelectedMaterials(newSelectedMaterial);
  };

  const categories = Object.values(CategoryResponse).map((category) => ({
    id: category,
    name: CATEGORY[category],
  }));

  const [selectedCategories, setSelectedCategories] = useState<
    PostCategoryRequest[]
  >([]);

  const onChangeCategory = (id: string) => {
    const newSelectedCategories = selectedCategories.concat([
      {
        categoryId: id as CategoryResponse,
        categoryType: id as CategoryResponse,
      },
    ]);
    setSelectedCategories(newSelectedCategories);
  };

  const handleRegister = () => {
    const postDishRequest: PostDishRequest = {
      dishName: fieldValue.dishName,
      createRequiredTime: Number(fieldValue.createRequiredTime),
      imageIds: [],
      materials: selectedMaterials.map((selectedMaterial) => ({
        materialName: selectedMaterial.materialName,
        quantity: selectedMaterial.quantity,
        unit: selectedMaterial.unit,
      })),
      category: selectedCategories,
    };
    // push('/');
    console.log(postDishRequest);
  };

  const handleBack = () => {
    push(PAGE_URL.HOME);
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
        <ul className={style['material-field']}>
          {selectedMaterials.map((materialField, i) => (
            <li key={materialField.id} className={style['field']}>
              <FormText
                title={i > 0 ? undefined : '材料'}
                placeholder="材料名"
                value={materialField.materialName}
                onChange={(e) =>
                  onChangeMaterial(
                    materialField.id,
                    e.currentTarget.value,
                    MATERIAL_CHANGE_VALUE.NAME
                  )
                }
              />
              <div className={style['content']}>
                <FormTextField
                  placeholder="数量を指定"
                  value={materialField.quantity}
                  onChange={(e) =>
                    onChangeMaterial(
                      materialField.id,
                      e.currentTarget.value,
                      MATERIAL_CHANGE_VALUE.QUANTITY
                    )
                  }
                />
                <FormSelect
                  items={materialUnits}
                  selectedValue={materialField.unit}
                  onClick={(id: string) =>
                    onChangeMaterial(
                      materialField.id,
                      id,
                      MATERIAL_CHANGE_VALUE.UNIT
                    )
                  }
                />
              </div>
            </li>
          ))}
          <Button
            text="追加"
            color={BUTTON_COLOR.secondary}
            onClick={addMaterial}
          />
        </ul>
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
        <Button
          text="追加"
          color={BUTTON_COLOR.primary}
          onClick={handleRegister}
        />
        <Button
          text="戻る"
          color={BUTTON_COLOR.secondary}
          onClick={handleBack}
        />
      </div>
    </div>
  );
};
