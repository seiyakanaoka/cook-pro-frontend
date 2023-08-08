import { useOutsideClick } from '@chakra-ui/react';
import { FC, useRef, useState } from 'react';

import { PullDownItem } from '@/types/PullDown';

import { FormTitle } from '../../FormTitle';
import { FormSelectPlate } from '../FormSelectPlate';

import style from './index.module.scss';

type Props = {
  title?: string;
  isRequired?: boolean;
  items: PullDownItem[];
  selectedValue: string | undefined;
  placeholder?: string;
  onClick: (id: string) => void;
};

export const FormSelect: FC<Props> = ({
  title,
  isRequired = true,
  items,
  selectedValue,
  placeholder = '入力してください',
  onClick,
}: Props) => {
  const selectedItem = items.find((item) => item.id === selectedValue)?.name;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleClick = (id: string) => {
    onClick(id);
    onClose();
  };

  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: ref,
    handler: onClose,
  });

  return (
    <div className={style['form-select-component']}>
      {!!title && <FormTitle title={title} isRequired={isRequired} />}
      <div className={style['field']} onClick={onOpen}>
        {selectedItem || placeholder}
        <span className={style['icon']}></span>
      </div>
      {isOpen && (
        <div className={style['panel']} ref={ref}>
          <FormSelectPlate items={items} onClick={handleClick} />
        </div>
      )}
    </div>
  );
};
