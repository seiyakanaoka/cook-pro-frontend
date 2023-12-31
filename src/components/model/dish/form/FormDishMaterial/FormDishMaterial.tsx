import { FC } from 'react';

import { FormSelect } from '@/components/ui/form/formSelect/FormSelect';
import { FormText } from '@/components/ui/form/FormText';
import { FormTextField } from '@/components/ui/form/FormTextField';
import {
  MATERIAL_CHANGE_VALUE,
  MaterialChangeValue,
} from '@/constants/material';
import { MaterialFormValues } from '@/types/Material';
import { PullDownItem } from '@/types/PullDown';

import style from './index.module.scss';

type Props = {
  title: string | undefined;
  materialField: MaterialFormValues;
  materialUnits: PullDownItem[];
  onChange: (id: string, value: string, type: MaterialChangeValue) => void;
};

export const FormDishMaterial: FC<Props> = ({
  title,
  materialField,
  materialUnits,
  onChange,
}: Props) => {
  return (
    <div className={style['form-dish-material-component']}>
      <FormText
        title={title}
        placeholder="材料名"
        value={materialField.materialName}
        onChange={(e) =>
          onChange(
            materialField.id,
            e.currentTarget.value,
            MATERIAL_CHANGE_VALUE.NAME
          )
        }
      />
      <div className={style['content']}>
        <FormTextField
          placeholder="数量を指定"
          value={materialField.quantity}
          onChange={(e) =>
            onChange(
              materialField.id,
              e.currentTarget.value,
              MATERIAL_CHANGE_VALUE.QUANTITY
            )
          }
        />
        <FormSelect
          items={materialUnits}
          selectedValue={materialField.unit}
          onClick={(id: string) =>
            onChange(materialField.id, id, MATERIAL_CHANGE_VALUE.UNIT)
          }
        />
      </div>
    </div>
  );
};
