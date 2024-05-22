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
import { TimerService } from '../../../services/timer.service';
import { CircularProgressBarComponent } from '../../circular-progress-bar/circular-progress-bar.component';
import { ControlButtonComponent } from './control-button/control-button.component';

@Component({
  selector: 'pomodoro-timer',
  standalone: true,
  imports: [
    CircularProgressBarComponent,
    TimeFormatPipe,
    CommonModule,
    ControlButtonComponent,
  ],
  templateUrl: './pomodoro-timer.component.html',
  styleUrl: './pomodoro-timer.component.scss',
})
export class PomodoroTimerComponent implements OnInit, OnDestroy {
  currentMode?: PomodoroMode;
  currentModeDetails?: PomodoroModeDetails;
  timeLeft$?: Observable<number> = of(0);
  progress$?: Observable<number> = of(100);
  timerComplete?: EventEmitter<void>;

  constructor(
    private route: ActivatedRoute,
    private timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.currentMode =
        (queryParams.get('mode')! as PomodoroMode) || PomodoroMode.POMODORO;
      this.currentModeDetails = pomodoroModeDetailsMap[this.currentMode];
      this.timeLeft$ = of(this.currentModeDetails.duration);
    });

    this.timerComplete = this.timerService.timerComplete;
  }

  ngOnDestroy(): void {
    this.timerService.resetTimer(this.currentModeDetails?.duration!);
  }

  startClick() {
    this.timerService.startTimer(this.currentModeDetails?.duration!);
    this.timeLeft$ = this.timerService.timeLeft$;
    this.progress$ = this.timeLeft$.pipe(
      map((timeLeft) => this.getProgress(timeLeft))
    );
  }

  pauseClick() {
    this.timerService.pauseTimer();
  }
  resumeClick() {
    this.timerService.resumeTimer();
  }

  resetClick() {
    this.timerService.resetTimer(this.currentModeDetails?.duration!);
  }

  getProgress(timeLeft: number) {
    const progress =
      100 -
      ((this.currentModeDetails?.duration! - timeLeft) /
        this.currentModeDetails?.duration!) *
        100;
    return progress;
  }
}
