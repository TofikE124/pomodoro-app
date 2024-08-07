export const formatTime = (value?: number | null): string => {
  if (!value) return '00:00';
  const minutes: number = Math.floor(value / 60);
  const seconds: number = value % 60;
  const formattedMinutes: string = minutes.toString().padStart(2, '0');
  const formattedSeconds: string = seconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};
