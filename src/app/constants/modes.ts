export enum PomodoroMode {
  POMODORO = 'Pomodoro',
  SHORT_BREAK = 'Short Break',
  LONG_BREAK = 'Long Break',
}
export type PomodoroModeDetails = {
  label: string;
  duration: number;
};

export const pomodoroModeDetailsMap: Record<PomodoroMode, PomodoroModeDetails> =
  {
    [PomodoroMode.POMODORO]: { label: 'Pomodoro', duration: 1500 },
    [PomodoroMode.SHORT_BREAK]: { label: 'Short Break', duration: 300 },
    [PomodoroMode.LONG_BREAK]: { label: 'Long Break', duration: 900 },
  };
