import { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import { DishCategory } from '@/components/model/dish/DishCategory';
import { DishTime } from '@/components/model/dish/DishTime';
import { DishDetailResponse } from '@/types/codegen/dish/DishDetailResponse';

import style from './index.module.scss';

type Props = {
  dishDetailResponse: DishDetailResponse | undefined;
};

export const DishDetail: FC<Props> = ({ dishDetailResponse }: Props) => {
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
      </div>
    </div>
  );
};
