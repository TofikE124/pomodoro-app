import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PomodoroTimerComponent } from './components/timer/pomodoro-timer/pomodoro-timer.component';
import { TimerModeSelectorComponent } from './components/timer/timer-mode-selector/timer-mode-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PomodoroTimerComponent, TimerModeSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
