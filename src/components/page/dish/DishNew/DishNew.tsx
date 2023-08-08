import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { FormDishMaterial } from '@/components/model/dish/form/FormDishMaterial';
import { FormSelectDishCategory } from '@/components/model/dish/form/FormSelectDishCategory';
import { Button } from '@/components/ui/Button';
import { FormImage } from '@/components/ui/form/FormImage';
import { FormText } from '@/components/ui/form/FormText';
import { BUTTON_COLOR } from '@/constants/button';
import { IMAGE_FIELD_SHAPE } from '@/constants/image';
import {
  MATERIAL,
  MATERIAL_CHANGE_VALUE,
  MaterialChangeValue,
} from '@/constants/material';
import { PAGE_URL } from '@/constants/route';
import { SNACKBAR_STATUS } from '@/constants/snackbar';
import { DISH_NEW_FORM_VALUES } from '@/constants/validation/dish';
import { SnackbarContext } from '@/context/snackbarContext';
import { useDishRequest } from '@/hooks/api/dish/useDishRequest';
import { useImageRequest } from '@/hooks/api/image/useImageRequest';
import { useFormText } from '@/hooks/useFormText';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';
import { PostDishRequest } from '@/types/codegen/dish/PostDishRequest';
import { MaterialUnitResponse } from '@/types/codegen/material/MaterialUnitResponse';
import { DishFormValues } from '@/types/Dish';
import { MaterialFormValues } from '@/types/Material';
import { base64ToBlob } from '@/utils/image';
import { isNumberString } from '@/utils/string';

import style from './index.module.scss';

export const DishNew: FC = () => {
  const { push } = useRouter();

  const { uploadImage } = useImageRequest();

  const { createDish } = useDishRequest();

  const { addSnackbar } = useContext(SnackbarContext);

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const {
    fieldValue,
    fieldState: { errors },
    onChange,
  } = useFormText<DishFormValues>({
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
    id: uuid(),
    materialName: '',
    quantity: '',
    unit: '',
  };

  const [selectedMaterials, setSelectedMaterials] = useState<
    MaterialFormValues[]
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

    const newImageIds = await Promise.all(
      imageIds
        .filter((image) => !!image)
        .map(async (image) => {
          const blob = base64ToBlob(image, 'image/png');
          if (typeof blob === 'undefined') return;
          return await uploadImage(blob);
        })
        .filter(
          (image): image is Promise<string> => typeof image !== 'undefined'
        )
    );

    const postDishRequest: PostDishRequest = {
      dishName: fieldValue.dishName,
      createRequiredTime: Number(fieldValue.createRequiredTime),
      imageIds: newImageIds,
      materials: selectedMaterials.map((selectedMaterial) => ({
        materialName: selectedMaterial.materialName,
        quantity: Number(selectedMaterial.quantity),
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
                  fieldShape={IMAGE_FIELD_SHAPE.SQUARE}
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
          errorMessage={isSubmit ? errors?.dishName : undefined}
          onChange={(e) => onChange('dishName', e)}
        />
        <FormText
          title="所要時間(分)"
          value={fieldValue.createRequiredTime}
          errorMessage={isSubmit ? errors?.createRequiredTime : undefined}
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
          <p className={style['message']}>
            {isSubmit &&
              (selectedMaterials.find(
                (selectedMaterial) => !isNumberString(selectedMaterial.quantity)
              )
                ? '数字のみ入力できます'
                : '必須項目です')}
          </p>
          <Button
            text="材料を追加"
            color={BUTTON_COLOR.SECONDARY}
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
          color={BUTTON_COLOR.PRIMARY}
          onClick={handleRegister}
        />
        <Button
          text="戻る"
          color={BUTTON_COLOR.SECONDARY}
          onClick={handleBack}
        />
      </div>
    </div>
  );
};
