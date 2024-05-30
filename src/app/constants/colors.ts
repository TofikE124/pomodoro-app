export enum Color {
  DARK_RED = 'Dark Red',
  LIGHT_BLUE = 'Light Blue',
  LIGHT_PURPLE = 'Light Purple',
}

export interface ColorDetails {
  value: string;
  type: Color;
}

export const colors: Record<Color, ColorDetails> = {
  [Color.DARK_RED]: { value: '#F87070', type: Color.DARK_RED },
  [Color.LIGHT_BLUE]: { value: '#70F3F8', type: Color.LIGHT_BLUE },
  [Color.LIGHT_PURPLE]: { value: '#D881F8', type: Color.LIGHT_PURPLE },
};
