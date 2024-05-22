import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerModeSelectorComponent } from './components/timer/timer-mode-selector/timer-mode-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TimerModeSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pomodoro-app';

  selections = ['a', 'b', 'c'];
}
