export enum PomodoroMode {
  POMODORO = 'Pomodoro',
  SHORT_BREAK = 'Short Break',
  LONG_BREAK = 'Long Break',
}
export type PomodoroModeDetails = {
  label: string;
  duration: number;
  isBreak: boolean;
};

export const pomodoroModeDetailsMap: Record<PomodoroMode, PomodoroModeDetails> =
  {
    [PomodoroMode.POMODORO]: { label: 'Pomodoro', duration: 2, isBreak: false },
    [PomodoroMode.SHORT_BREAK]: {
      label: 'Short Break',
      duration: 2,
      isBreak: true,
    },
    [PomodoroMode.LONG_BREAK]: {
      label: 'Long Break',
      duration: 2,
      isBreak: true,
    },
  };
