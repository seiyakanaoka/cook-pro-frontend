import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import '@splidejs/splide/css';

import { DishCategory } from '@/components/model/dish/DishCategory';
import { DishEditPanel } from '@/components/model/dish/DishEditPanel';
import { DishTime } from '@/components/model/dish/DishTime';
import { Modal } from '@/components/ui/Modal';
import { MATERIAL } from '@/constants/material';
import { PAGE_URL } from '@/constants/route';
import { SnackbarContext } from '@/context/snackbarContext';
import { useDishRequest } from '@/hooks/api/dish/useDishRequest';
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
  const { addSnackbar } = useContext(SnackbarContext);

  const { query, push } = useRouter();

  const dishId = query['dishId'] as string | undefined;

  const { deleteDish } = useDishRequest();

  const titles = dishDetailResponse?.name.split('\n');

  const images = dishDetailResponse?.images;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNavigateEdit = () => {
    push(PAGE_URL.DISH + '/' + dishId + '?status=edit');
  };

  const handleDelete = async () => {
    if (!dishDetailResponse?.id) return;
    await deleteDish(dishDetailResponse.id);
    await push(PAGE_URL.HOME);
    addSnackbar('削除が完了しました');
  };

  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  const handlePanelOpen = () => {
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
  };

  return (
    <div className={style['dish-detail-component']}>
      <div className={style['edit']}>
        <div className={style['dots']} onClick={handlePanelOpen}>
          <div className={style['dots-field']}>
            <div className={style['dot']}></div>
          </div>
          <div className={style['dots-field']}>
            <div className={style['dot']}></div>
          </div>
          <div className={style['dots-field']}>
            <div className={style['dot']}></div>
          </div>
        </div>
        <div className={style['panel']}>
          <DishEditPanel
            isOpen={isPanelOpen}
            onClose={handlePanelClose}
            onClickEdit={handleNavigateEdit}
            onClickDelete={handleOpen}
          />
        </div>
      </div>
      <div className={style['content']}>
        <div className={style['top']}>
          <Splide
            hasTrack={false}
            aria-label="私のお気に入りの画像集"
            options={{
              lazyLoad: true,
              arrows: false,
              paginationDirection: 'rtl',
            }}
          >
            <SplideTrack>
              {images?.map((image) => (
                <SplideSlide key={image.id}>
                  <div className={style['image-item']}>
                    <img
                      src={image.url}
                      alt=""
                      loading="lazy"
                      className={style['image']}
                    />
                  </div>
                </SplideSlide>
              ))}
            </SplideTrack>
            <ul
              className={clsx(
                'splide__pagination splide__pagination--ltr',
                style['splide-pagination']
              )}
              role="tablist"
              aria-label="Select slide to show"
            ></ul>
          </Splide>
        </div>
        <div className={style['bottom-content']}>
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
        </div>
      </div>
      <Modal
        title={dishDetailResponse?.name ?? ''}
        isOpen={isOpen}
        onClick={handleDelete}
        onClose={handleClose}
      />
    </div>
  );
};
