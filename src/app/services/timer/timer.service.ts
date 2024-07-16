import { pomodoroModeDetailsMap } from './../../constants/modes';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  BehaviorSubject,
  interval,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { PomodoroMode, PomodoroModeDetails } from '../../constants/modes';
import { PomodoroCycleService } from '../pomodoro-cycle.service';
import { TimerDurationService } from './timer-duration.service';
import { TimerModeService } from './timer-mode.service';
import { formatTime } from '../../lib/utils';

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

  private timerCompletesSubject = new Subject<PomodoroMode>();
  timerCompletes$: Observable<PomodoroMode> =
    this.timerCompletesSubject.asObservable();

  private timerSubscription?: Subscription;
  private currentModeDetails?: PomodoroModeDetails;
  private fullDuration: number = 0;
  private startTime: number | null = null;

  constructor(
    private timerModeService: TimerModeService,
    private timeDurationService: TimerDurationService,
    private pomodoroCycleService: PomodoroCycleService,
    private titleService: Title
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

      // Update the title
      this.updateTitle(
        this.timeLeftSubject.value,
        this.timerModeService.getCurrentMode()
      );
    });
  }

  // Timer Methods
  startTimer(duration?: number) {
    this.startTime = Date.now();
    this.timerStateSubject.next(TimerState.RUNNING);
    const currentDuration = duration || this.fullDuration;
    this.clearTimer();
    this.timeLeftSubject.next(currentDuration);
    this.progressSubject.next(100);
    this.startCounting();

    // Update the title
    this.updateTitle(currentDuration, this.timerModeService.getCurrentMode());
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
      .pipe(map(() => Date.now()))
      .subscribe((now) => {
        const newTimeLeft =
          this.fullDuration - Math.floor((now - this.startTime!) / 1000);
        if (newTimeLeft >= 0) {
          this.timeLeftSubject.next(newTimeLeft);
          this.progressSubject.next(
            this.getProgress(newTimeLeft, this.fullDuration)
          );

          // Update the title
          this.updateTitle(newTimeLeft, this.timerModeService.getCurrentMode());

          if (newTimeLeft == 0) this.timerCompleted();
        } else {
          this.clearTimer();
        }
      });
  }

  private timerCompleted() {
    this.timerStateSubject.next(TimerState.COMPLETED);
    this.timerModeService.nextMode();
    this.timerCompletesSubject.next(this.timerModeService.getCurrentMode());
    this.checkStartTimer();
  }

  private checkStartTimer() {
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

  private getTitle(time: number, mode: PomodoroMode) {
    const modeToTitleMap: Record<PomodoroMode, string> = {
      [PomodoroMode.POMODORO]: 'Time to Focus',
      [PomodoroMode.SHORT_BREAK]: 'Time to take a short break',
      [PomodoroMode.LONG_BREAK]: 'Time to take a long break',
    };

    return `${formatTime(time)} - ${modeToTitleMap[mode]}`;
  }

  private updateTitle(time: number, mode: PomodoroMode) {
    this.titleService.setTitle(this.getTitle(time, mode));
  }
}
