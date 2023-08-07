import { FC, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import { DishCategory } from '@/components/model/dish/DishCategory';
import { DishTime } from '@/components/model/dish/DishTime';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { BUTTON_COLOR } from '@/constants/button';
import { MATERIAL } from '@/constants/material';
import { DishDetailResponse } from '@/types/codegen/dish/DishDetailResponse';
import { MaterialResponse } from '@/types/codegen/material/MaterialResponse';
import { MaterialUnitResponse } from '@/types/codegen/material/MaterialUnitResponse';

import style from './index.module.scss';

type Props = {
  dishDetailResponse: DishDetailResponse | undefined;
  dishMaterialResponse: MaterialResponse[];
};

export const DishDetail: FC<Props> = ({
  dishDetailResponse,
  dishMaterialResponse,
}: Props) => {
  const titles = dishDetailResponse?.name.split('\n');

  const images = dishDetailResponse?.images;

  // 画像の速さとスライド方法の指定
  const properties = {
    width: '100%',
    autoplay: false,
    transitionDuration: 300,
    arrows: false,
    infinite: true,
    easing: 'ease',
    // ドットを作成
    indicators: () => (
      <div className="image-dot">
        <div className="dot"></div>
      </div>
    ),
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={style['dish-detail-component']}>
      <div className={style['top']}>
        <Slide {...properties}>
          {images?.map((image) => (
            <div key={image.id} className={style['image-item']}>
              <img src={image.url} alt="" className={style['image']} />
            </div>
          ))}
        </Slide>
      </div>
      <div className={style['bottom']}>
        <div className={style['title-field']}>
          {titles?.map((text, i) => (
            <p className={style['title']} key={`${i}-${text}`}>
              {text}
            </p>
          ))}
        </div>
        <ul className={style['category-field']}>
          {dishDetailResponse?.categories.map((category) => (
            <li key={category} className={style['category']}>
              <DishCategory category={category} />
            </li>
          ))}
        </ul>
        <DishTime
          time={dishDetailResponse?.createRequiredTime.toString() ?? ''}
        />
        <div className={style['material-field']}>
          <p className={style['title']}>【材料】</p>
          <ul className={style['material-list']}>
            {dishMaterialResponse.map((material) => (
              <li key={material.id} className={style['material']}>
                <div className={style['material-content']}>
                  <span className={style['name']}>{material.name}</span>
                  <span className={style['unit']}>
                    {material.unit == MaterialUnitResponse.TABLESPOON ||
                    material.unit == MaterialUnitResponse.TEASPOON
                      ? MATERIAL[material.unit] + material.quantity
                      : material.quantity + MATERIAL[material.unit]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={style['action']}>
          <Button text="削除" color={BUTTON_COLOR.RED} onClick={onOpen} />
        </div>
      </div>
      <Modal
        title={dishDetailResponse?.name ?? ''}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};
