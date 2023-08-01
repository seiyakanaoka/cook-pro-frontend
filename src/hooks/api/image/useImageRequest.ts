import { postImage } from '@/api/image';
import { API_URL } from '@/constants/api/api';

type UseImageRequest = {
  uploadImage: (blob: Blob) => Promise<string>;
};

export const useImageRequest = (): UseImageRequest => {
  const uploadImage = async (blob: Blob) => {
    const response = await postImage(API_URL.IMAGE.IMAGE_UPLOAD, blob);
    return response.id;
  };

  return { uploadImage };
};
