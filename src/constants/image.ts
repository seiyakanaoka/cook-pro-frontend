export const IMAGE_TYPE = {
  CIRCLE: 'circle',
  SQUARE: 'square',
} as const;

export type ImageType = (typeof IMAGE_TYPE)[keyof typeof IMAGE_TYPE];
