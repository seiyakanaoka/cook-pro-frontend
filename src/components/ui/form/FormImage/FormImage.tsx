import clsx from 'clsx';
import { ChangeEventHandler, FC } from 'react';

import ClearIcon from '@/assets/icons/all-clear.svg';
import CameraIcon from '@/assets/icons/camera.svg';
import { IMAGE_FIELD_SHAPE, ImageFieldShape } from '@/constants/image';

import style from './index.module.scss';

type Props = {
  image: string | undefined;
  fieldShape?: ImageFieldShape;
  onChange: (value: string) => void;
  onClear: () => void;
  onFailure: () => void;
};

export const FormImage: FC<Props> = ({
  image,
  fieldShape = IMAGE_FIELD_SHAPE.CIRCLE,
  onChange,
  onClear,
  onFailure,
}: Props) => {
  const hasNotImage = !image;

  const handleChangeUserImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const blob = e.target.files?.[0];
    if (typeof blob === 'undefined') {
      onFailure();
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result !== 'string') {
        onFailure();
        return;
      }
      onChange(result);
    };
    reader.readAsDataURL(blob);
  };

  return (
    <div
      className={clsx(
        style['form-image-component'],
        style[`-${fieldShape}`],
        hasNotImage && style['-not-selected']
      )}
    >
      {hasNotImage ? (
        <label className={style['wrapper']}>
          <span className={style['icon']}>
            <CameraIcon />
          </span>
          <input
            type="file"
            className={style['field']}
            onChange={handleChangeUserImage}
          />
        </label>
      ) : (
        <>
          <div className={style['icon']} onClick={onClear}>
            <ClearIcon />
          </div>
          <img src={image} alt="" loading="lazy" className={style['field']} />
        </>
      )}
    </div>
  );
};
