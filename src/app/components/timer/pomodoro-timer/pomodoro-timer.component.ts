import { map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  PomodoroMode,
  PomodoroModeDetails,
  pomodoroModeDetailsMap,
} from '../../../constants/modes';
import { TimeFormatPipe } from '../../../pipes/time-format.pipe';
import { TimerService, TimerState } from '../../../services/timer.service';
import { CircularProgressBarComponent } from '../../circular-progress-bar/circular-progress-bar.component';
import { ControlButtonComponent } from './control-button/control-button.component';
import { TimerModeService } from '../../../services/timer-mode.service';
import { SkipButtonComponent } from './skip-button/skip-button.component';

@Component({
  selector: 'pomodoro-timer',
  standalone: true,
  imports: [
    CircularProgressBarComponent,
    TimeFormatPipe,
    CommonModule,
    ControlButtonComponent,
    SkipButtonComponent,
  ],
  templateUrl: './pomodoro-timer.component.html',
  styleUrl: './pomodoro-timer.component.scss',
})
export class PomodoroTimerComponent implements OnInit, OnDestroy {
  timeLeft$?: Observable<number> = of(0);
  progress$?: Observable<number> = of(100);
  timerState$?: Observable<TimerState>;

  timerStateRunning = TimerState.RUNNING;

  timerComplete?: EventEmitter<void>;

  constructor(
    private timerModeService: TimerModeService,
    private timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.timerModeService.currentModeDetails$.subscribe(
      (currentModeDetails) => {
        this.timeLeft$ = this.timerService.timeLeft$;
        this.progress$ = this.timerService.progress$;
        this.timerState$ = this.timerService.timerState$;
      }
    );
  }

  ngOnDestroy(): void {
    this.timerService.resetTimer();
  }
}
