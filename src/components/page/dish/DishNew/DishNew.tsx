import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';

import { FormDishMaterial } from '@/components/model/dish/form/FormDishMaterial';
import { FormSelectDishCategory } from '@/components/model/dish/form/FormSelectDishCategory';
import { Button } from '@/components/ui/Button';
import { FormImage } from '@/components/ui/form/FormImage';
import { FormText } from '@/components/ui/form/FormText';
import { BUTTON_COLOR } from '@/constants/button';
import { IMAGE_TYPE } from '@/constants/image';
import {
  MATERIAL,
  MATERIAL_CHANGE_VALUE,
  MaterialChangeValue,
} from '@/constants/material';
import { PAGE_URL } from '@/constants/route';
import { SNACKBAR_STATUS } from '@/constants/snackbar';
import {
  DISH_NEW_FORM_VALUES,
  DISH_NEW_VALIDATION,
} from '@/constants/validation/dish';
import { SnackbarContext } from '@/context/snackbarContext';
import { useDishRequest } from '@/hooks/api/dish/useDishRequest';
import { useFormText } from '@/hooks/useFormText';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';
import { PostDishRequest } from '@/types/codegen/dish/PostDishRequest';
import { MaterialUnitResponse } from '@/types/codegen/material/MaterialUnitResponse';
import { PostMaterialRequest } from '@/types/codegen/material/PostMaterialRequest';
import { DishFormValues } from '@/types/Dish';

import style from './index.module.scss';

export const DishNew: FC = () => {
  const { push } = useRouter();

  const { createDish } = useDishRequest();

  const { addSnackbar } = useContext(SnackbarContext);

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const { fieldValue, onChange } = useFormText<DishFormValues>({
    defaultValues: DISH_NEW_FORM_VALUES,
  });

  const [imageIds, setImageIds] = useState<string[]>(new Array(3).fill(''));

  const handleChangeImage = (index: number, value: string) => {
    const newImageIds = imageIds.map((image, imageIndex) => {
      if (index === imageIndex) {
        return value;
      }
      return image;
    });
    setImageIds(newImageIds);
  };

  const handleClearImage = (index: number) => {
    const newImageIds = imageIds.map((image, imageIndex) => {
      if (index === imageIndex) {
        return '';
      }
      return image;
    });
    setImageIds(newImageIds);
  };

  const handleFailure = () => {
    addSnackbar('画像をアップロードできませんでした', SNACKBAR_STATUS.ABNORMAL);
  };

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

  const categories = Object.values(CategoryResponse);

  const [selectedCategories, setSelectedCategories] = useState<
    CategoryResponse[]
  >([]);

  const onChangeCategory = (id: string) => {
    if (
      selectedCategories.find((selectedCategory) => selectedCategory === id)
    ) {
      const newSelectedCategories = selectedCategories.filter(
        (selectedCategory) => selectedCategory !== id
      );
      setSelectedCategories(newSelectedCategories);
      return;
    }
    const newSelectedCategories = selectedCategories.concat(
      id as CategoryResponse
    );
    setSelectedCategories(newSelectedCategories);
  };

  const hasNotImage = imageIds.filter((image) => image !== '').length === 0;

  const hasNotCategories = selectedCategories.length === 0;

  const hasNotMaterials =
    selectedMaterials.filter(
      (selectedMaterial) =>
        !selectedMaterial.materialName ||
        !selectedMaterial.quantity ||
        !selectedMaterial.unit
    ).length > 0;

  const handleRegister = async () => {
    if (hasNotImage || hasNotCategories || hasNotMaterials) {
      setIsSubmit(true);
      return;
    }
    const postDishRequest: PostDishRequest = {
      dishName: fieldValue.dishName,
      createRequiredTime: Number(fieldValue.createRequiredTime),
      imageIds,
      materials: selectedMaterials.map((selectedMaterial) => ({
        materialName: selectedMaterial.materialName,
        quantity: selectedMaterial.quantity,
        unit: selectedMaterial.unit,
      })),
      category: selectedCategories.map((selectedCategory) => ({
        categoryId: selectedCategory,
        categoryType: selectedCategory,
      })),
    };
    const response = await createDish(postDishRequest);
    await push(PAGE_URL.DISH + '/' + response.id);
    addSnackbar('料理が追加されました');
  };

  const handleBack = () => {
    push(PAGE_URL.HOME);
  };

  return (
    <div className={style['dish-new-component']}>
      <h1 className={style['title']}>料理新規登録</h1>
      <div className={style['field']}>
        <div className={style['image-field']}>
          <ul className={style['list']}>
            {imageIds.map((image, i) => (
              <li key={i} className={style['image']}>
                <FormImage
                  image={image}
                  type={IMAGE_TYPE.SQUARE}
                  onChange={(value: string) => handleChangeImage(i, value)}
                  onClear={() => handleClearImage(i)}
                  onFailure={handleFailure}
                />
              </li>
            ))}
          </ul>
          {isSubmit && <p className={style['message']}>必須項目です</p>}
        </div>
        <FormText
          title="料理名"
          value={fieldValue.dishName}
          errorMessage={
            isSubmit
              ? DISH_NEW_VALIDATION.DISH_NAME.required?.message
              : undefined
          }
          onChange={(e) => onChange('dishName', e)}
        />
        <FormText
          title="所要時間"
          value={fieldValue.createRequiredTime}
          errorMessage={
            isSubmit
              ? DISH_NEW_VALIDATION.CREATE_REQUIRED_TIME.required?.message
              : undefined
          }
          onChange={(e) => onChange('createRequiredTime', e)}
        />
        <ul className={style['material-field']}>
          {selectedMaterials.map((materialField, i) => (
            <FormDishMaterial
              key={materialField.id}
              title={i === 0 ? '材料' : undefined}
              materialField={materialField}
              materialUnits={materialUnits}
              onChange={onChangeMaterial}
            />
          ))}
          <p className={style['message']}>{isSubmit && '必須項目です'}</p>
          <Button
            text="材料を追加"
            color={BUTTON_COLOR.secondary}
            onClick={addMaterial}
          />
        </ul>
        <div className={style['category-field']}>
          <FormSelectDishCategory
            title="カテゴリー"
            categories={categories}
            selectedCategories={selectedCategories}
            errorMessage={isSubmit ? '必須項目です' : undefined}
            onClick={onChangeCategory}
          />
        </div>
      </div>
      <div className={style['actions']}>
        <Button
          text="料理を追加"
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
