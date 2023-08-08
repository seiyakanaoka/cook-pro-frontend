export const IMAGE_FIELD_SHAPE = {
  CIRCLE: 'circle',
  SQUARE: 'square',
} as const;

export type ImageFieldShape =
  (typeof IMAGE_FIELD_SHAPE)[keyof typeof IMAGE_FIELD_SHAPE];

export const MIME_TYPE = {
  JPEG: 'image/jpeg',
  PNG: 'image/png',
} as const;

export type MimeType = (typeof MIME_TYPE)[keyof typeof MIME_TYPE];

export const MAX_IMAGE_FILE_SIZE = 5242880 as const;
