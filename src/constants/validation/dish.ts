import { DishFormValues } from '@/types/Dish';
import { DefaultValues, FieldValueValidate } from '@/types/Form';

export const DISH_NEW_VALIDATION: {
  DISH_NAME: FieldValueValidate;
  CREATE_REQUIRED_TIME: FieldValueValidate;
} = {
  DISH_NAME: {
    required: { value: true, message: '必須項目です' },
  },
  CREATE_REQUIRED_TIME: {
    required: { value: true, message: '必須項目です' },
  },
} as const;

export const DISH_NEW_FORM_VALUES: DefaultValues<DishFormValues> = {
  dishName: {
    value: '',
    validate: DISH_NEW_VALIDATION.DISH_NAME,
  },
  createRequiredTime: {
    value: '',
    validate: DISH_NEW_VALIDATION.CREATE_REQUIRED_TIME,
  },
} as const;
