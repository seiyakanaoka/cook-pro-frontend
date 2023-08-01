import { ImageResponse } from 'next/server';

import { axiosClient } from '@/utils/axios';

export const postImage = async (
  url: string,
  blob: Blob
): Promise<ImageResponse> => {
  const formData = new FormData();
  formData.append('image', blob);
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const response = await axiosClient.post<ImageResponse>(url, formData, {
    headers,
  });
  return response.data;
};
