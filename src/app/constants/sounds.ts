export enum SoundType {
  TICKING_SOUND = 'TickingSound',
  ALARM_SOUND = 'AlarmSound',
  BACKGROUND_SOUND = 'BackgroundSound',
}

export type SoundSettings = Record<SoundType, SoundSetting>;

export interface SoundSetting {
  details: SoundDetails | null;
  volume: number;
}
export type SoundCategoryType =
  | ClockTickingSoundType
  | BackgroundSoundType
  | null;

export interface SoundDetails {
  label: string;
  url: string;
  type: SoundCategoryType;
}

export const defaultSoundSettings: SoundSettings = {
  [SoundType.TICKING_SOUND]: {
    details: null,
    volume: 50,
  },
  [SoundType.ALARM_SOUND]: {
    details: null,
    volume: 50,
  },
  [SoundType.BACKGROUND_SOUND]: {
    details: null,
    volume: 50,
  },
};

// Clock Ticking
export enum ClockTickingSoundType {
  CLOCK_TICKING_1 = 'Clock Ticking 1',
  CLOCK_TICKING_2 = 'Clock Ticking 2',
  CLOCK_TICKING_3 = 'Clock Ticking 3',
  CLOCK_TICKING_4 = 'Clock Ticking 4',
}

export const clockTickingSoundsMap: Record<
  ClockTickingSoundType,
  SoundDetails
> = {
  [ClockTickingSoundType.CLOCK_TICKING_1]: {
    label: 'Clock Ticking 1',
    url: '/assets/sounds/clockTicking/clockTicking(1).mp3',
    type: ClockTickingSoundType.CLOCK_TICKING_1,
  },
  [ClockTickingSoundType.CLOCK_TICKING_2]: {
    label: 'Clock Ticking 2',
    url: '/assets/sounds/clockTicking/clockTicking(2).mp3',
    type: ClockTickingSoundType.CLOCK_TICKING_2,
  },
  [ClockTickingSoundType.CLOCK_TICKING_3]: {
    label: 'Clock Ticking 3',
    url: '/assets/sounds/clockTicking/clockTicking(3).mp3',
    type: ClockTickingSoundType.CLOCK_TICKING_3,
  },
  [ClockTickingSoundType.CLOCK_TICKING_4]: {
    label: 'Clock Ticking 4',
    url: '/assets/sounds/clockTicking/clockTicking(4).mp3',
    type: ClockTickingSoundType.CLOCK_TICKING_4,
  },
};

// Background Sounds
export enum BackgroundSoundType {
  RAIN = 'Rain',
  FOREST_AMBIENCE = 'Forest Ambience',
  OCEAN_WAVES = 'Ocean Waves',
  FIREPLACE_CRACKLING = 'Fireplace Crackling',
}

export const backgroundSoundsMap: Record<BackgroundSoundType, SoundDetails> = {
  [BackgroundSoundType.RAIN]: {
    label: 'Rain',
    url: '/assets/sounds/background/Rain.mp3',
    type: BackgroundSoundType.RAIN,
  },
  [BackgroundSoundType.FOREST_AMBIENCE]: {
    label: 'Forest Ambience',
    url: '/assets/sounds/background/ForestAmbience.mp3',
    type: BackgroundSoundType.FOREST_AMBIENCE,
  },
  [BackgroundSoundType.OCEAN_WAVES]: {
    label: 'Ocean Waves',
    url: '/assets/sounds/background/OceanWaves.mp3',
    type: BackgroundSoundType.OCEAN_WAVES,
  },
  [BackgroundSoundType.FIREPLACE_CRACKLING]: {
    label: 'Fireplace Crackling',
    url: '/assets/sounds/background/FireplaceCrackling.mp3',
    type: BackgroundSoundType.FIREPLACE_CRACKLING,
  },
};

// export function getSoundCategoryType(soundType: SoundType) {
//   switch (soundType) {
//     case SoundType.TICKING_SOUND:
//       return ClockTickingSoundType;
//     case SoundType.BACKGROUND_SOUND:
//       return BackgroundSoundType;
//     case SoundType.ALARM_SOUND:
//       return null;
//     default:
//       throw new Error(`Invalid sound type: ${soundType}`);
//   }
// }
