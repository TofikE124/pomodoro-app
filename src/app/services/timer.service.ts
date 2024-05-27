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
  private progressSubject = new BehaviorSubject<number>(0);
  private timeLeftSubject = new BehaviorSubject<number>(0);
  private timerSubscription?: Subscription;
  private fullDuration: number = 0;

  timeLeft$ = this.timeLeftSubject.asObservable();
  progress$ = this.progressSubject.asObservable();

  constructor(
    private timerModeService: TimerModeService,
    private timeDurationService: TimerDurationService
  ) {
    // Intialize Timer
    this.timerModeService.currentMode$?.subscribe((currentMode) => {
      // Get new details
      const currentModeDetails =
        this.timeDurationService.getDetails()[currentMode];

      this.fullDuration = currentModeDetails.duration;
      this.timeLeftSubject.next(currentModeDetails?.duration);
      this.progressSubject.next(100);
      this.resetTimer();
    });
  }

  // Timer Methods
  startTimer(duration?: number) {
    const currentDuration = duration || this.fullDuration;
    this.clearTimer();
    this.timeLeftSubject.next(currentDuration);
    this.progressSubject.next(100);
    this.startCounting();
  }

  private clearTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  resetTimer() {
    this.clearTimer();
    this.startTimer();
    this.pauseTimer();
  }

  pauseTimer() {
    this.clearTimer();
  }

  resumeTimer() {
    this.startCounting();
  }

  private startCounting() {
    this.timerSubscription = interval(1000)
      .pipe(map(() => -1))
      .subscribe((decrement) => {
        const newTimeLeft = this.timeLeftSubject.value + decrement;
        if (newTimeLeft >= 0) {
          this.timeLeftSubject.next(newTimeLeft);
          this.progressSubject.next(
            this.getProgress(newTimeLeft, this.fullDuration)
          );

          if (newTimeLeft == 0) this.timerModeService.nextMode();
        } else {
          this.clearTimer();
        }
      });
  }

  private getProgress(timeLeft: number, totalTime: number) {
    return 100 - ((totalTime! - timeLeft) / totalTime) * 100;
  }
}
