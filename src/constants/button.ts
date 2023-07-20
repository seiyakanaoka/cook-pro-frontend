export const BUTTON_COLOR = {
  primary: 'primary',
  secondary: 'secondary',
  blur: 'blue',
} as const;

export type ButtonColor = (typeof BUTTON_COLOR)[keyof typeof BUTTON_COLOR];

export const BUTTON_TYPE = { button: 'button', submit: 'submit' } as const;

export type ButtonType = (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE];
