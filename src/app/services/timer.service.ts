import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PomodoroModeDetails } from '../constants/modes';
import { PomodoroCycleService } from './pomodoro-cycle.service';
import { TimerDurationService } from './timer-duration.service';
import { TimerModeService } from './timer-mode.service';

export enum TimerState {
  IDLE = 'Idle',
  RUNNING = 'Running',
  PAUSED = 'Paused',
  COMPLETED = 'Completed',
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
  private timerStateSubject = new BehaviorSubject<TimerState>(TimerState.IDLE);

  timeLeft$ = this.timeLeftSubject.asObservable();
  progress$ = this.progressSubject.asObservable();
  timerState$: Observable<TimerState> = this.timerStateSubject.asObservable();

  private timerSubscription?: Subscription;
  private currentModeDetails?: PomodoroModeDetails;
  private fullDuration: number = 0;

  constructor(
    private timerModeService: TimerModeService,
    private timeDurationService: TimerDurationService,
    private pomodoroCycleService: PomodoroCycleService
  ) {
    // Intialize Timer
    this.timerModeService.currentMode$?.subscribe((currentMode) => {
      // Get new details
      const currentModeDetails =
        this.timeDurationService.getDetails()[currentMode];

      this.currentModeDetails = currentModeDetails;
      this.fullDuration = currentModeDetails.duration;
      this.timeLeftSubject.next(currentModeDetails?.duration);
      this.progressSubject.next(100);
      this.resetTimer();
    });
  }

  // Timer Methods
  startTimer(duration?: number) {
    this.timerStateSubject.next(TimerState.RUNNING);
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
    this.timerStateSubject.next(TimerState.IDLE);
    this.clearTimer();
  }

  pauseTimer() {
    this.timerStateSubject.next(TimerState.PAUSED);
    this.clearTimer();
  }

  resumeTimer() {
    this.timerStateSubject.next(TimerState.RUNNING);
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

          if (newTimeLeft == 0) this.timerCompleted();
        } else {
          this.clearTimer();
        }
      });
  }

  private timerCompleted() {
    this.timerStateSubject.next(TimerState.COMPLETED);
    this.timerModeService.nextMode();
    this.checkStartTimer();
  }

  private checkStartTimer() {
    console.log(
      this.currentModeDetails,
      this.pomodoroCycleService.getAutoStartBreaks()
    );
    if (this.currentModeDetails?.isBreak) {
      if (this.pomodoroCycleService.getAutoStartBreaks()) {
        this.startTimer();
      }
    } else {
      if (this.pomodoroCycleService.getAutoStartPomodoros()) {
        this.startTimer();
      }
    }
  }

  private getProgress(timeLeft: number, totalTime: number) {
    return 100 - ((totalTime! - timeLeft) / totalTime) * 100;
  }
}
