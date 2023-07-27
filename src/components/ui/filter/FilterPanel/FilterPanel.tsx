'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { BUTTON_COLOR } from '@/constants/button';

import { Button } from '../../Button';
import { FormCheckbox } from '../../form/FormCheckbox';

import style from './index.module.scss';

type Props = {
  isOpen: boolean;
  items: { id: string; text: string; isCheck: boolean }[];
  onChange: (items: { id: string; text: string; isCheck: boolean }[]) => void;
  onClose: () => void;
};

export const FilterPanel: FC<Props> = ({
  isOpen,
  items,
  onChange,
  onClose,
}: Props) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);

  const [filterItems, setFilterItems] = useState<
    {
      id: string;
      text: string;
      isCheck: boolean;
    }[]
  >(items);

  useEffect(() => {
    if (!filterItems.length && !!items.length) {
      setFilterItems(items);
    }
  }, [filterItems.length, items]);

  const handleClick = (id: string) => {
    const newCategories = filterItems.map((item) => {
      if (id === item.id) {
        const newItem = { ...item, isCheck: !item.isCheck };
        return newItem;
      }
      return item;
    });
    setFilterItems(newCategories);
  };

  const handleClose = () => {
    onChange(filterItems);
    onClose();
  };

  return (
    <div>
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
          className={style['filter-overlay']}
          onClick={onClose}
        ></div>
      </CSSTransition>
      <CSSTransition
        nodeRef={panelRef}
        unmountOnExit
        in={isOpen}
        timeout={400}
        classNames={{
          enter: style['filter-enter'],
          enterActive: style['filter-active-enter'],
          exit: style['filter-exit'],
          exitActive: style['filter-active-exit'],
        }}
      >
        <div
          ref={panelRef}
          className={style['filter-panel-component']}
          onClick={onClose}
        >
          <div
            className={style['panel-field']}
            onClick={(e) => e.stopPropagation()}
          >
            <p className={style['title']}>カテゴリフィルター</p>
            <div className={style['body-content']}>
              <ul className={style['list']}>
                {filterItems.map((item) => (
                  <FormCheckbox
                    key={item.text}
                    text={item.text}
                    isCheck={item.isCheck}
                    onClick={() => handleClick(item.id)}
                  />
                ))}
              </ul>
            </div>
            <Button
              text="閉じる"
              color={BUTTON_COLOR.green}
              onClick={handleClose}
            />
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
