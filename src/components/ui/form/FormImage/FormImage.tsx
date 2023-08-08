import clsx from 'clsx';
import { ChangeEventHandler, FC } from 'react';

import ClearIcon from '@/assets/icons/all-clear.svg';
import CameraIcon from '@/assets/icons/camera.svg';
import {
  IMAGE_FIELD_SHAPE,
  ImageFieldShape,
  MAX_IMAGE_FILE_SIZE,
  MIME_TYPE,
  MimeType,
} from '@/constants/image';

import style from './index.module.scss';

type Props = {
  image: string | undefined;
  fieldShape?: ImageFieldShape;
  mimeTypes?: MimeType[];
  onChange: (value: string) => void;
  onClear: () => void;
  onFailure: (message: string) => void;
};

export const FormImage: FC<Props> = ({
  image,
  fieldShape = IMAGE_FIELD_SHAPE.CIRCLE,
  mimeTypes = [MIME_TYPE.PNG],
  onChange,
  onClear,
  onFailure,
}: Props) => {
  const hasNotImage = !image;

  const acceptMimeTypes = mimeTypes.join(', ');

  const handleChangeUserImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const blob = e.target.files?.[0];
    if (typeof blob === 'undefined') {
      onFailure('アップロードできませんでした');
      return;
    }
    // 5MB以上だった場合、アップロードさせない
    if (blob.size >= MAX_IMAGE_FILE_SIZE) {
      onFailure('サイズは5MBまでです');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result !== 'string') {
        onFailure('アップロードできませんでした');
        return;
      }
      const isAcceptMimeType = !!mimeTypes.find((mimeType) =>
        result.includes(mimeType)
      );
      // 拡張子チェック
      if (!isAcceptMimeType) {
        onFailure('jpeg・png拡張子のみアップロード可能です');
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
            accept={acceptMimeTypes}
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
