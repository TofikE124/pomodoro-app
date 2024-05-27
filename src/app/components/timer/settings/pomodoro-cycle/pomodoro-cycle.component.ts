import { Component } from '@angular/core';
import { LongBreakIntervalComponent } from './long-break-interval/long-break-interval.component';
import { AutoStartPomodorosComponent } from './auto-start-pomodoros/auto-start-pomodoros.component';
import { AutoStartBreaksComponent } from './auto-start-breaks/auto-start-breaks.component';

@Component({
  selector: 'pomodoro-cycle',
  standalone: true,
  imports: [
    LongBreakIntervalComponent,
    AutoStartPomodorosComponent,
    AutoStartBreaksComponent,
  ],
  templateUrl: './pomodoro-cycle.component.html',
  styleUrl: './pomodoro-cycle.component.scss',
})
export class PomodoroCycleComponent {}
