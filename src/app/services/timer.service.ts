import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Subscription, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimerModeService } from './timer-mode.service';
import {
  PomodoroModeDetails,
  pomodoroModeDetailsMap,
} from '../constants/modes';

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

  controlButtonModeSubject?: BehaviorSubject<ControlButtonMode> =
    new BehaviorSubject<ControlButtonMode>(ControlButtonMode.START);
  controlButtonDetailsSubject?: BehaviorSubject<ControlButtonDetails> =
    new BehaviorSubject<ControlButtonDetails>({} as ControlButtonDetails);

  currentControlButtonMode$?: Observable<ControlButtonMode> =
    this.controlButtonModeSubject?.asObservable();
  currentControlButtonDetails$?: Observable<ControlButtonDetails> =
    this.controlButtonDetailsSubject?.asObservable();
  controlButtonDetailsMap?: Record<ControlButtonMode, ControlButtonDetails>;

  constructor(private timerModeService: TimerModeService) {
    this.timerModeService.currentMode$?.subscribe((currentMode) => {
      const currentModeDetails = pomodoroModeDetailsMap[currentMode];
      this.populateControlButtonDetailsMap(currentModeDetails);
      this.controlButtonDetailsSubject?.next(
        this.controlButtonDetailsMap![ControlButtonMode.START]
      );
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
          if (newTimeLeft == 0) this.timerCompleted();
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

  timerCompleted() {
    this.changeControlButtonMode(ControlButtonMode.RESET);
  }

  // Button Mode Methods
  changeControlButtonMode(controlButtonMode: ControlButtonMode) {
    this.controlButtonModeSubject?.next(controlButtonMode);
    this.controlButtonDetailsSubject?.next(
      this.controlButtonDetailsMap![controlButtonMode]
    );
  }

  populateControlButtonDetailsMap(currentModeDetails: PomodoroModeDetails) {
    this.controlButtonDetailsMap = {
      [ControlButtonMode.START]: {
        label: 'start',
        onClick: () => {
          this.startTimer(currentModeDetails?.duration!);
          this.changeControlButtonMode(ControlButtonMode.PAUSE);
        },
      },
      [ControlButtonMode.PAUSE]: {
        label: 'pause',
        onClick: () => {
          this.pauseTimer();
          this.changeControlButtonMode(ControlButtonMode.RESUME);
        },
      },
      [ControlButtonMode.RESUME]: {
        label: 'resume',
        onClick: () => {
          this.resumeTimer();
          this.changeControlButtonMode(ControlButtonMode.PAUSE);
        },
      },
      [ControlButtonMode.RESET]: {
        label: 'reset',
        onClick: () => {
          this.resetTimer(currentModeDetails.duration);
          this.changeControlButtonMode(ControlButtonMode.START);
        },
      },
    };
  }
}
