import { useOutsideClick } from '@chakra-ui/react';
import { FC, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import DeleteIcon from '@/assets/icons/delete.svg';
import EditIcon from '@/assets/icons/edit.svg';

import style from './index.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
};

export const DishEditPanel: FC<Props> = ({
  isOpen,
  onClose,
  onClickEdit,
  onClickDelete,
}: Props) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: ref,
    handler: onClose,
  });

  const handleClickEdit = () => {
    onClose();
    onClickEdit();
  };

  const handleClickDelete = () => {
    onClose();
    onClickDelete();
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      unmountOnExit
      in={isOpen}
      timeout={300}
      classNames={{
        enter: style['panel-enter'],
        enterActive: style['panel-active-enter'],
        exit: style['panel-exit'],
        exitActive: style['panel-active-exit'],
      }}
    >
      <div
        className={style['dish-edit-panel-component']}
        ref={(e) => {
          nodeRef.current = e;
          ref.current = e;
        }}
      >
        <div className={style['edit']} onClick={handleClickEdit}>
          <p className={style['text']}>編集</p>
          <div className={style['icon']}>
            <EditIcon />
          </div>
        </div>
        <div className={style['delete']} onClick={handleClickDelete}>
          <p className={style['text']}>削除</p>
          <div className={style['icon']}>
            <DeleteIcon />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
