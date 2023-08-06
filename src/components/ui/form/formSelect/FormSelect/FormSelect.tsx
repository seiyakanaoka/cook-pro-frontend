import { FC, useState } from 'react';

import { FormSelectPlate } from '../FormSelectPlate';

import style from './index.module.scss';

type Props = {
  items: { id: string; name: string }[];
  selectedValue: string | undefined;
  placeholder?: string;
  onClick: (id: string) => void;
};

export const FormSelect: FC<Props> = ({
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

  return (
    <div className={style['form-select-component']}>
      <div className={style['field']} onClick={onOpen}>
        {selectedItem || placeholder}
        <span className={style['icon']}></span>
      </div>
      {isOpen && (
        <div className={style['panel']}>
          <FormSelectPlate items={items} onClick={handleClick} />
        </div>
      )}
    </div>
  );
};
