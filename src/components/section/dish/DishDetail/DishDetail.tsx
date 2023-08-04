import { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import { DishCategory } from '@/components/model/dish/DishCategory';
import { DishTime } from '@/components/model/dish/DishTime';
import { MATERIAL } from '@/constants/material';
import { DishDetailResponse } from '@/types/codegen/dish/DishDetailResponse';
import { DishMaterialResponse } from '@/types/codegen/dish/DishMaterialResponse';
import { MaterialResponse } from '@/types/codegen/material/MaterialResponse';

import style from './index.module.scss';

type Props = {
  dishDetailResponse: DishDetailResponse | undefined;
  dishMaterialResponse: DishMaterialResponse[];
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
              <li key={material.materialId} className={style['material']}>
                {material.materialName + ' '}
                {material.unit == MaterialResponse.TABLESPOON ||
                material.unit == MaterialResponse.TEASPOON
                  ? MATERIAL[material.unit] + material.quantity
                  : material.quantity + MATERIAL[material.unit]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
