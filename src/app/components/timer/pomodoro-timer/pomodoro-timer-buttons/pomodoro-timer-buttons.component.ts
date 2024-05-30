import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimerService, TimerState } from '../../../../services/timer.service';
import { ControlButtonComponent } from '../control-button/control-button.component';
import { SkipButtonComponent } from '../skip-button/skip-button.component';

@Component({
  selector: 'pomodoro-timer-buttons',
  standalone: true,
  imports: [SkipButtonComponent, ControlButtonComponent, NgIf, CommonModule],
  templateUrl: './pomodoro-timer-buttons.component.html',
  styleUrl: './pomodoro-timer-buttons.component.scss',
})
export class PomodoroTimerButtonsComponent implements OnInit, OnDestroy {
  timerState$?: Observable<TimerState>;

  timerStateRunning = TimerState.RUNNING;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.timerState$ = this.timerService.timerState$;
  }

  ngOnDestroy(): void {
    this.timerService.resetTimer();
  }
}
