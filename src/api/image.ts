import { GetImageResponse } from '@/types/codegen/image/GetImageResponse';
import { axiosClient } from '@/utils/axios';

export const postImage = async (
  url: string,
  blob: Blob
): Promise<GetImageResponse> => {
  const formData = new FormData();
  formData.append('image', blob);
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const response = await axiosClient.post<GetImageResponse>(url, formData, {
    headers,
  });
  return response.data;
};
