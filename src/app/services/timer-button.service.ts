import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimerModeService } from './timer-mode.service';
import {
  ControlButtonDetails,
  ControlButtonMode,
  TimerService,
} from './timer.service';

@Injectable({
  providedIn: 'root',
})
export class TimerButtonService {
  private controlButtonModeSubject?: BehaviorSubject<ControlButtonMode> =
    new BehaviorSubject<ControlButtonMode>(ControlButtonMode.START);
  controlButtonDetailsSubject?: BehaviorSubject<ControlButtonDetails> =
    new BehaviorSubject<ControlButtonDetails>({} as ControlButtonDetails);

  currentControlButtonMode$?: Observable<ControlButtonMode> =
    this.controlButtonModeSubject?.asObservable();
  currentControlButtonDetails$?: Observable<ControlButtonDetails> =
    this.controlButtonDetailsSubject?.asObservable();
  controlButtonDetailsMap?: Record<ControlButtonMode, ControlButtonDetails>;

  constructor(
    private timerService: TimerService,
    timerModeService: TimerModeService
  ) {
    this.populateControlButtonDetailsMap();
    timerService.timeLeft$.subscribe((timeLeft) => {
      if (!timeLeft) this.changeControlButtonMode(ControlButtonMode.RESET);
    });

    timerModeService.currentMode$.subscribe(() => {
      this.changeControlButtonMode(ControlButtonMode.START);
    });
  }

  changeControlButtonMode(controlButtonMode: ControlButtonMode) {
    this.controlButtonModeSubject?.next(controlButtonMode);
    this.controlButtonDetailsSubject?.next(
      this.controlButtonDetailsMap![controlButtonMode]
    );
  }

  private populateControlButtonDetailsMap() {
    this.controlButtonDetailsMap = {
      [ControlButtonMode.START]: {
        label: 'start',
        onClick: () => {
          this.timerService.startTimer();
          this.changeControlButtonMode(ControlButtonMode.PAUSE);
        },
      },
      [ControlButtonMode.PAUSE]: {
        label: 'pause',
        onClick: () => {
          this.timerService.pauseTimer();
          this.changeControlButtonMode(ControlButtonMode.RESUME);
        },
      },
      [ControlButtonMode.RESUME]: {
        label: 'resume',
        onClick: () => {
          this.timerService.resumeTimer();
          this.changeControlButtonMode(ControlButtonMode.PAUSE);
        },
      },
      [ControlButtonMode.RESET]: {
        label: 'reset',
        onClick: () => {
          this.timerService.resetTimer();
          this.changeControlButtonMode(ControlButtonMode.START);
        },
      },
    };
  }
}
