import { FC, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { BUTTON_COLOR } from '@/constants/button';

import { Button } from '../Button';

import style from './index.module.scss';

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal: FC<Props> = ({ title, isOpen, onClose }: Props) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  return (
    <CSSTransition
      nodeRef={overlayRef}
      unmountOnExit
      in={isOpen}
      timeout={{
        appear: 0,
        enter: 0,
        exit: 450,
      }}
    >
      <div
        ref={overlayRef}
        className={style['modal-overlay']}
        onClick={onClose}
      >
        <div className={style['content-field']}>
          <div className={style['content']}>
            <p className={style['title']}>{title}を削除しますか？</p>
            <p className={style['description']}>元に戻せません</p>
          </div>
          <div className={style['action']}>
            <Button
              text="削除"
              color={BUTTON_COLOR.PRIMARY}
              onClick={() => {}}
            />
            <Button
              text="閉じる"
              color={BUTTON_COLOR.SECONDARY}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
