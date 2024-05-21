export type icon = {
  URL: string;
};

export enum iconType {
  ARROW_UP,
  ARROW_DOWN,
  CLOSE,
  SETTINGS,
  LOGO,
}

export const iconMap: Record<iconType, icon> = {
  [iconType.ARROW_UP]: { URL: '/assets/images/icon-arrow-up.svg' },
  [iconType.ARROW_DOWN]: { URL: '/assets/images/icon-arrow-down.svg' },
  [iconType.CLOSE]: { URL: '/assets/images/icon-close.svg' },
  [iconType.SETTINGS]: { URL: '/assets/images/icon-settings.svg' },
  [iconType.LOGO]: { URL: '/assets/images/logo.svg' },
};
