import { TimerDurationService } from './timer-duration.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { PomodoroMode, PomodoroModeDetails } from '../constants/modes';
import { ActivatedRoute, Router } from '@angular/router';
import { PomodoroCycleService } from './pomodoro-cycle.service';

@Injectable({
  providedIn: 'root',
})
export class TimerModeService {
  private currentModeSubject = new BehaviorSubject<PomodoroMode>(
    PomodoroMode.POMODORO
  );
  private currentModeDetailsSubject = new BehaviorSubject<PomodoroModeDetails>(
    this.timeDurationService.getDetails()[PomodoroMode.POMODORO]
  );

  currentMode$ = this.currentModeSubject.asObservable();
  currentModeDetails$ = this.currentModeDetailsSubject.asObservable();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private timeDurationService: TimerDurationService,
    private pomodoroCycleService: PomodoroCycleService
  ) {
    this.changeMode(PomodoroMode.POMODORO);

    this.timeDurationService.durations$.subscribe((durations) => {
      const currentMode = this.currentModeSubject.value;
      this.currentModeSubject.next(currentMode);
      this.currentModeDetailsSubject.next(durations[currentMode]);
    });
  }

  changeMode(mode: PomodoroMode) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        mode: mode,
      },
      queryParamsHandling: 'merge',
    });
    this.currentModeSubject?.next(mode);
    this.currentModeDetailsSubject?.next(
      this.timeDurationService.getDetails()[mode]
    );
  }

  nextMode() {
    this.changeMode(this.pomodoroCycleService.getNextMode());
  }
}
