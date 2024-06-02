import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TimeFormatPipe } from '../../../pipes/time-format.pipe';
import { TimerService } from '../../../services/timer/timer.service';
import { CircularProgressBarComponent } from '../../circular-progress-bar/circular-progress-bar.component';
import { PomodoroTimerButtonsComponent } from './pomodoro-timer-buttons/pomodoro-timer-buttons.component';
import { AudioService } from '../../../services/audio/audio.service';

@Component({
  selector: 'pomodoro-timer',
  standalone: true,
  imports: [
    CircularProgressBarComponent,
    TimeFormatPipe,
    CommonModule,
    PomodoroTimerButtonsComponent,
  ],
  templateUrl: './pomodoro-timer.component.html',
  styleUrl: './pomodoro-timer.component.scss',
})
export class PomodoroTimerComponent implements OnInit, OnDestroy {
  timeLeft$?: Observable<number> = of(0);
  progress$?: Observable<number> = of(100);

  timerComplete?: EventEmitter<void>;

  constructor(
    private timerService: TimerService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.timeLeft$ = this.timerService.timeLeft$;
    this.progress$ = this.timerService.progress$;
  }

  ngOnDestroy(): void {
    this.timerService.resetTimer();
  }
}
