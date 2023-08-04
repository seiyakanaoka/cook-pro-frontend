import { MaterialResponse } from '@/types/codegen/material/MaterialResponse';

export interface DishMaterialResponse {
  materialId: string;
  materialName: string;
  quantity: number;
  unit: MaterialResponse;
}
