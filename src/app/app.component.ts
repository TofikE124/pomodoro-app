import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription, take, timer } from 'rxjs';
import { CircularProgressBarComponent } from './components/circular-progress-bar/circular-progress-bar.component';
import { PomodoroTimerComponent } from './components/timer/pomodoro-timer/pomodoro-timer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PomodoroTimerComponent, CircularProgressBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
