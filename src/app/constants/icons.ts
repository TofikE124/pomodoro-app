export type icon = {
  URL: string;
};

export enum IconType {
  ARROW_UP,
  ARROW_DOWN,
  CLOSE,
  SETTINGS,
  LOGO,
  CHECK,
  NEXT,
}

export const iconMap: Record<IconType, icon> = {
  [IconType.ARROW_UP]: { URL: '/assets/images/icon-arrow-up.svg' },
  [IconType.ARROW_DOWN]: { URL: '/assets/images/icon-arrow-down.svg' },
  [IconType.CLOSE]: { URL: '/assets/images/icon-close.svg' },
  [IconType.SETTINGS]: { URL: '/assets/images/icon-settings.svg' },
  [IconType.CHECK]: { URL: '/assets/images/icon-check.svg' },
  [IconType.NEXT]: { URL: '/assets/images/icon-next.svg' },
  [IconType.LOGO]: { URL: '/assets/images/logo.svg' },
};
