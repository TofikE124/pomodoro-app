export enum SoundType {
  TICKING_SOUND = 'Ticking Sound',
  ALARAM_SOUND = 'Alarm Sound',
  BACKGROUND_SOUND = 'Background Sound',
}

export type SoundSettings = Record<SoundType, SoundSetting>;

export interface SoundSetting {
  details: SoundDetails | null;
  volume: number;
}

export interface SoundDetails {
  label: string;
  url: string;
  type: ClockTickingType;
}

export const defaultSoundSettings: SoundSettings = {
  [SoundType.TICKING_SOUND]: {
    details: null,
    volume: 50,
  },
  [SoundType.ALARAM_SOUND]: {
    details: null,
    volume: 50,
  },
  [SoundType.BACKGROUND_SOUND]: {
    details: null,
    volume: 50,
  },
};

// Clock Ticking
export enum ClockTickingType {
  CLOCK_TICKING_1 = 'Clock Ticking 1',
  CLOCK_TICKING_2 = 'Clock Ticking 2',
  CLOCK_TICKING_3 = 'Clock Ticking 3',
  CLOCK_TICKING_4 = 'Clock Ticking 4',
}

export const clockTickingMap: Record<ClockTickingType, SoundDetails> = {
  [ClockTickingType.CLOCK_TICKING_1]: {
    label: 'Clock Ticking 1',
    url: '/assets/sounds/clockTicking/clockTicking(1).mp3',
    type: ClockTickingType.CLOCK_TICKING_1,
  },
  [ClockTickingType.CLOCK_TICKING_2]: {
    label: 'Clock Ticking 2',
    url: '/assets/sounds/clockTicking/clockTicking(2).mp3',
    type: ClockTickingType.CLOCK_TICKING_2,
  },
  [ClockTickingType.CLOCK_TICKING_3]: {
    label: 'Clock Ticking 3',
    url: '/assets/sounds/clockTicking/clockTicking(3).mp3',
    type: ClockTickingType.CLOCK_TICKING_3,
  },
  [ClockTickingType.CLOCK_TICKING_4]: {
    label: 'Clock Ticking 4',
    url: '/assets/sounds/clockTicking/clockTicking(4).mp3',
    type: ClockTickingType.CLOCK_TICKING_4,
  },
};
