export const MATERIAL = {
  GRAMS: 'グラム',
  TABLESPOON: '大さじ',
  TEASPOON: '小さじ',
  CC: 'cc',
  ML: 'ml',
  PIECE: '個',
  BUNCH: '束',
  CHO: '丁',
  PACK: 'パック',
  SHEET: '枚',
  UNIT: '本',
} as const;

export const MATERIAL_CHANGE_VALUE = {
  NAME: 'name',
  QUANTITY: 'quantity',
  UNIT: 'unit',
} as const;

export type MaterialChangeValue =
  (typeof MATERIAL_CHANGE_VALUE)[keyof typeof MATERIAL_CHANGE_VALUE];
