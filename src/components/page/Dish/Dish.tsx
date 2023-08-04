import { useRouter } from 'next/router';
import { FC } from 'react';

import { DishDetail } from '@/components/section/dish/DishDetail';
import { useDish } from '@/hooks/api/dish/useDish';

enum MaterialUnit {
  // グラム
  GRAMS = 'GRAMS',
  // 大さじ
  TABLESPOON = 'TABLESPOON',
  // 小さじ
  TEASPOON = 'TEASPOON',
  // cc
  CC = 'CC',
  // ml
  ML = 'ML',
  // 個
  PIECE = 'PIECE',
  // 束
  BUNCH = 'BUNCH',
  // 丁
  CHO = 'CHO',
  // パック
  PACK = 'PACK',
  // 枚
  SHEET = 'SHEET',
  // 本
  UNIT = 'UNIT',
}

interface MaterialResponse {
  materialId: string;
  materialName: string;
  quantity: number;
  unit: MaterialUnit;
}

const materials: MaterialResponse[] = [
  {
    materialId: '1',
    materialName: 'にんじん',
    quantity: 2,
    unit: MaterialUnit.UNIT,
  },
  {
    materialId: '2',
    materialName: '玉ねぎ',
    quantity: 2,
    unit: MaterialUnit.PIECE,
  },
  {
    materialId: '3',
    materialName: '白菜',
    quantity: 2,
    unit: MaterialUnit.BUNCH,
  },
  {
    materialId: '4',
    materialName: '塩',
    quantity: 2,
    unit: MaterialUnit.GRAMS,
  },
  {
    materialId: '5',
    materialName: 'ジャガイモ',
    quantity: 1,
    unit: MaterialUnit.UNIT,
  },
];

export const Dish: FC = () => {
  const { query } = useRouter();

  const dishId = query['dishId'] as string | undefined;

  const { dishDetailResponse } = useDish(dishId ?? '');

  return <DishDetail dishDetailResponse={dishDetailResponse} />;
};
