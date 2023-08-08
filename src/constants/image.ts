export const IMAGE_FIELD_SHAPE = {
  CIRCLE: 'circle',
  SQUARE: 'square',
} as const;

export type ImageFieldShape =
  (typeof IMAGE_FIELD_SHAPE)[keyof typeof IMAGE_FIELD_SHAPE];
