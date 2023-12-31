import { FC, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { BUTTON_COLOR } from '@/constants/button';

import { Button } from '../Button';

import style from './index.module.scss';

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
};

export const Modal: FC<Props> = ({
  title,
  isOpen,
  onClose,
  onClick,
}: Props) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  return (
    <CSSTransition
      nodeRef={overlayRef}
      unmountOnExit
      in={isOpen}
      timeout={300}
      classNames={{
        enter: style['modal-enter'],
        enterActive: style['modal-active-enter'],
        exit: style['modal-exit'],
        exitActive: style['modal-active-exit'],
      }}
    >
      <div
        ref={overlayRef}
        className={style['modal-overlay']}
        onClick={onClose}
      >
        <div
          className={style['content-field']}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={style['content']}>
            <p className={style['title']}>{title}を削除しますか？</p>
            <p className={style['description']}>元に戻せません</p>
          </div>
          <div className={style['action']}>
            <Button
              text="削除"
              color={BUTTON_COLOR.PRIMARY}
              onClick={onClick}
            />
            <Button
              text="閉じる"
              color={BUTTON_COLOR.SECONDARY}
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
