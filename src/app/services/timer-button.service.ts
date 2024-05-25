import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ControlButtonMode,
  ControlButtonDetails,
  TimerService,
} from './timer.service';
import { PomodoroModeDetails } from '../constants/modes';
import { TimerModeService } from './timer-mode.service';
import { TimerDurationService } from './timer-duration.service';

@Injectable({
  providedIn: 'root',
})
export class TimerButtonService {
  controlButtonModeSubject?: BehaviorSubject<ControlButtonMode> =
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
    timerModeService: TimerModeService,
    timerDurationService: TimerDurationService
  ) {
    timerService.timeLeft$.subscribe((timeLeft) => {
      if (!timeLeft) this.changeControlButtonMode(ControlButtonMode.RESET);
    });

    timerModeService.currentMode$.subscribe((mode) => {
      const currentModeDetails = timerDurationService.getDurations()[mode];
      this.populateControlButtonDetailsMap(currentModeDetails);
      this.changeControlButtonMode(ControlButtonMode.START);
    });
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
          this.timerService.startTimer(currentModeDetails?.duration!);
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
          this.timerService.resetTimer(currentModeDetails.duration);
          this.changeControlButtonMode(ControlButtonMode.START);
        },
      },
    };
  }
}
