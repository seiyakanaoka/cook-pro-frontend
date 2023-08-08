import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { uuid } from 'uuidv4';

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
import { DISH_NEW_VALIDATION } from '@/constants/validation/dish';
import { SnackbarContext } from '@/context/snackbarContext';
import { useDishRequest } from '@/hooks/api/dish/useDishRequest';
import { useImageRequest } from '@/hooks/api/image/useImageRequest';
import { useFormText } from '@/hooks/useFormText';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';
import { DishDetailResponse } from '@/types/codegen/dish/DishDetailResponse';
import { PutDishRequest } from '@/types/codegen/dish/PutDishRequest';
import { MaterialResponse } from '@/types/codegen/material/MaterialResponse';
import { MaterialUnitResponse } from '@/types/codegen/material/MaterialUnitResponse';
import { DishFormValues } from '@/types/Dish';
import { MaterialFormValues } from '@/types/Material';
import { base64ToBlob } from '@/utils/image';
import { isNumberString } from '@/utils/string';

import style from './index.module.scss';

type Props = {
  dishDetailResponse: DishDetailResponse | undefined;
  dishMaterialResponse: MaterialResponse[];
};

export const DishEdit: FC<Props> = ({
  dishDetailResponse,
  dishMaterialResponse,
}: Props) => {
  const { query, push, back } = useRouter();

  const { uploadImage } = useImageRequest();

  const { editDish } = useDishRequest();

  const { addSnackbar } = useContext(SnackbarContext);

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const dishId = query['dishId'] as string | undefined;

  const { fieldValue, onChange } = useFormText<DishFormValues>({
    defaultValues: {
      dishName: {
        value: dishDetailResponse?.name ?? '',
      },
      createRequiredTime: {
        value: dishDetailResponse?.createRequiredTime.toString() ?? '',
      },
    },
  });

  const [imageIds, setImageIds] = useState<string[]>(
    dishDetailResponse?.images.map((image) => image.url) ?? []
  );

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
  >(
    dishMaterialResponse.map((dishMaterial) => ({
      ...dishMaterial,
      materialName: dishMaterial.name,
      quantity: dishMaterial.quantity.toString(),
    })) ?? []
  );

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
  >(dishDetailResponse?.categories ?? []);

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

  const handleUploadImages = async (imageIds: string[]) => {
    return await Promise.all(
      imageIds
        .map(async (image) => {
          const blob = base64ToBlob(image, 'image/png');
          if (typeof blob === 'undefined') return;
          return await uploadImage(blob);
        })
        .filter(
          (image): image is Promise<string> => typeof image !== 'undefined'
        )
    );
  };

  const handleEdit = async (dishId: string, putDishRequest: PutDishRequest) => {
    const response = await editDish(dishId, putDishRequest);
    await push(PAGE_URL.DISH + '/' + response.id);
    addSnackbar('料理の編集が完了しました');
  };

  const handleClick = async () => {
    if (hasNotImage || hasNotCategories || hasNotMaterials || !dishId) {
      setIsSubmit(true);
      return;
    }

    const filterImageIds = imageIds.filter((image) => !!image);

    const putDishRequest: PutDishRequest = {
      dishName: fieldValue.dishName,
      createRequiredTime: Number(fieldValue.createRequiredTime),
      imageIds: filterImageIds,
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

    if (!!filterImageIds.find((imageId) => !imageId.includes('image/png'))) {
      await handleEdit(dishId, putDishRequest);
      return;
    }

    putDishRequest.imageIds = await handleUploadImages(filterImageIds);
    await handleEdit(dishId, putDishRequest);
  };

  const handleBack = () => {
    back();
  };

  return (
    <div className={style['dish-edit-component']}>
      <h1 className={style['title']}>料理編集</h1>
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
          title="所要時間(分)"
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
          text="修正完了"
          color={BUTTON_COLOR.PRIMARY}
          onClick={handleClick}
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
