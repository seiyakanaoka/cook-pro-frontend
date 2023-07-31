'use client';

import { FC } from 'react';

import { DishDetail } from '@/components/section/dish/DishDetail';
import { CategoryResponse } from '@/types/codegen/category/CategoryResponse';
import DishImage from 'public/food-1.png';

export const Dish: FC = () => {
  return (
    <DishDetail
      dish={{
        images: [DishImage.src],
        title: '【マネしてほしい料理！！】\n最高のメインディッシュ',
        categories: [
          CategoryResponse.JAPAN_FOOD,
          CategoryResponse.MEAT_DISH,
          CategoryResponse.FISH_DISH,
          CategoryResponse.SALAD,
        ],
        time: '20',
      }}
    />
  );
};
