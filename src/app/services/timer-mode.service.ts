import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import {
  PomodoroMode,
  PomodoroModeDetails,
  pomodoroModeDetailsMap,
} from '../constants/modes';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TimerModeService {
  private currentModeSubject = new BehaviorSubject<PomodoroMode>(
    PomodoroMode.POMODORO
  );
  private currentModeDetailsSubject = new BehaviorSubject<PomodoroModeDetails>(
    pomodoroModeDetailsMap[PomodoroMode.POMODORO]
  );

  currentMode$ = this.currentModeSubject.asObservable();
  currentModeDetails$ = this.currentModeDetailsSubject.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.changeMode(PomodoroMode.POMODORO);
    this.route.queryParamMap.subscribe((queryParams) => {
      const currentMode = queryParams.get('mode')! as PomodoroMode;
      this.currentModeSubject?.next(currentMode);
      this.currentModeDetailsSubject?.next(pomodoroModeDetailsMap[currentMode]);
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
  }
}
