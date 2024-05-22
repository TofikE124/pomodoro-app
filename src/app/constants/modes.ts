export enum PomodoroMode {
  POMODORO = 'Pomodoro',
  SHORT_BREAK = 'Short Break',
  LONG_BREAK = 'Long Break',
}
export type ModeType = {
  label: string;
};

export const modeMap: Record<PomodoroMode, ModeType> = {
  [PomodoroMode.POMODORO]: { label: 'Pomodoro' },
  [PomodoroMode.SHORT_BREAK]: { label: 'Short Break' },
  [PomodoroMode.LONG_BREAK]: { label: 'Long Break' },
};
