import { ChangeEventHandler, FC, FocusEventHandler } from 'react';

import { FORM_TEXT_FIELD_TYPE, FormTextFieldType } from '@/constants/form';
import { ErrorMessage } from '@/types/Form';

import { FormTextField } from '../FormTextField';
import { FormTitle } from '../FormTitle';

import style from './index.module.scss';

type Props = {
  title: string;
  value: string;
  type?: FormTextFieldType;
  placeholder?: string;
  isRequired?: boolean;
  errorMessage?: ErrorMessage | string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export const FormText: FC<Props> = ({
  title,
  value,
  type = FORM_TEXT_FIELD_TYPE.TEXT,
  placeholder,
  isRequired = true,
  errorMessage,
  onChange,
  onBlur,
}: Props) => {
  const errorMessages = () => {
    if (typeof errorMessage === 'string') {
      return errorMessage;
    } else if (!!errorMessage?.required) {
      return errorMessage.required;
    } else if (!!errorMessage?.maxLength) {
      return errorMessage.maxLength;
    } else if (!!errorMessage?.minLength) {
      return errorMessage.minLength;
    } else if (!!errorMessage?.regex) {
      return errorMessage.regex;
    }
    return undefined;
  };

  const message = errorMessages();

  return (
    <div className={style['form-text-component']}>
      <FormTitle title={title} isRequired={isRequired} />
      <FormTextField
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {!!message && <p className={style['message']}>{message}</p>}
    </div>
  );
};
