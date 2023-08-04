import { MaterialUnitResponse } from '@/types/codegen/material/MaterialUnitResponse';

export interface MaterialResponse {
  id: string;
  name: string;
  quantity: number;
  unit: MaterialUnitResponse;
}
