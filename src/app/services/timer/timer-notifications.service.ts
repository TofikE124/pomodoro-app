import { Injectable } from '@angular/core';
import { NotificationService } from '../notifications.service';
import { TimerService } from './timer.service';
import { PomodoroMode } from '../../constants/modes';

@Injectable({
  providedIn: 'root',
})
export class TimerNotificationsService {
  notificationMessages: Record<
    PomodoroMode,
    { title: string; options?: NotificationOptions; duration?: number }
  > = {
    [PomodoroMode.POMODORO]: { title: 'Time to Focus!' },
    [PomodoroMode.SHORT_BREAK]: {
      title: 'Time to take a short break!',
    },
    [PomodoroMode.LONG_BREAK]: {
      title: 'Time to take a long break!',
    },
  };

  constructor(
    private notificationsService: NotificationService,
    private timerService: TimerService
  ) {
    notificationsService.requestPermission();
    this.timerService.timerCompletes$.subscribe((mode) => {
      const message = this.notificationMessages[mode];
      notificationsService.showNotification(message.title);
    });
  }
}
