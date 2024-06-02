import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimerModeService } from './timer-mode.service';
import {
  ControlButtonDetails,
  TimerService,
  TimerState,
} from './timer.service';

export enum ControlButtonState {
  START,
  PAUSE,
  RESUME,
  RESET,
}

const TimerButtonStateMap: Record<TimerState, ControlButtonState> = {
  [TimerState.IDLE]: ControlButtonState.START,
  [TimerState.PAUSED]: ControlButtonState.RESUME,
  [TimerState.RUNNING]: ControlButtonState.PAUSE,
  [TimerState.COMPLETED]: ControlButtonState.RESET,
};

@Injectable({
  providedIn: 'root',
})
export class TimerButtonService {
  private controlButtonModeSubject?: BehaviorSubject<ControlButtonState> =
    new BehaviorSubject<ControlButtonState>(ControlButtonState.START);
  controlButtonDetailsSubject?: BehaviorSubject<ControlButtonDetails> =
    new BehaviorSubject<ControlButtonDetails>({} as ControlButtonDetails);

  currentControlButtonMode$?: Observable<ControlButtonState> =
    this.controlButtonModeSubject?.asObservable();
  currentControlButtonDetails$?: Observable<ControlButtonDetails> =
    this.controlButtonDetailsSubject?.asObservable();
  controlButtonDetailsMap?: Record<ControlButtonState, ControlButtonDetails>;

  constructor(
    private timerService: TimerService,
    timerModeService: TimerModeService
  ) {
    this.populateControlButtonDetailsMap();

    timerService.timerState$.subscribe((state) => {
      this.changeControlButtonMode(TimerButtonStateMap[state]);
    });
  }

  changeControlButtonMode(controlButtonMode: ControlButtonState) {
    this.controlButtonModeSubject?.next(controlButtonMode);
    this.controlButtonDetailsSubject?.next(
      this.controlButtonDetailsMap![controlButtonMode]
    );
  }

  private populateControlButtonDetailsMap() {
    this.controlButtonDetailsMap = {
      [ControlButtonState.START]: {
        label: 'start',
        onClick: () => {
          this.timerService.startTimer();
        },
      },
      [ControlButtonState.PAUSE]: {
        label: 'pause',
        onClick: () => {
          this.timerService.pauseTimer();
        },
      },
      [ControlButtonState.RESUME]: {
        label: 'resume',
        onClick: () => {
          this.timerService.resumeTimer();
        },
      },
      [ControlButtonState.RESET]: {
        label: 'reset',
        onClick: () => {
          this.timerService.resetTimer();
        },
      },
    };
  }
}
