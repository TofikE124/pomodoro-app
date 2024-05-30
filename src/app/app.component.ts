import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PomodoroTimerComponent } from './components/timer/pomodoro-timer/pomodoro-timer.component';
import { TimerModeSelectorComponent } from './components/timer/timer-mode-selector/timer-mode-selector.component';
import { SettingsComponent } from './components/timer/settings/settings.component';
import { AudioService } from './services/audio/audio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PomodoroTimerComponent,
    TimerModeSelectorComponent,
    SettingsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
