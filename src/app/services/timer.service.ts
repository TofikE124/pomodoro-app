import { TimerDurationService } from './timer-duration.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimerModeService } from './timer-mode.service';
import { PomodoroModeDetails } from '../constants/modes';

export enum ControlButtonMode {
  START,
  PAUSE,
  RESUME,
  RESET,
}

export type ControlButtonDetails = {
  label: string;
  onClick: () => void;
};

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timeLeftSubject = new BehaviorSubject<number>(0);
  timeLeft$ = this.timeLeftSubject.asObservable();
  private timerSubscription?: Subscription;

  constructor(
    private timerModeService: TimerModeService,
    private timeDurationService: TimerDurationService
  ) {
    this.timerModeService.currentMode$?.subscribe((currentMode) => {
      // Get new details
      const currentModeDetails =
        this.timeDurationService.getDurations()[currentMode];

      this.timeLeftSubject.next(currentModeDetails?.duration);
      this.resetTimer(currentModeDetails?.duration);
    });
  }

  // Timer Methods
  startTimer(duration: number) {
    this.clearTimer();
    this.timeLeftSubject.next(duration);
    this.timerSubscription = interval(1000)
      .pipe(map(() => -1))
      .subscribe((decrement) => {
        const newTimeLeft = this.timeLeftSubject.value + decrement;
        if (newTimeLeft >= 0) {
          this.timeLeftSubject.next(newTimeLeft);
        } else {
          this.clearTimer();
        }
      });
  }

  clearTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  resetTimer(duration: number) {
    this.clearTimer();
    this.startTimer(duration);
    this.pauseTimer();
  }

  pauseTimer() {
    this.clearTimer();
  }

  resumeTimer() {
    const remainingTime = this.timeLeftSubject.value;
    this.startTimer(remainingTime);
  }
}
