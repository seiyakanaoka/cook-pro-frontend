import { MaterialUnitResponse } from '@/types/codegen/material/MaterialUnitResponse';

export interface MaterialResponse {
  materialId: string;
  materialName: string;
  quantity: number;
  unit: MaterialUnitResponse;
}
