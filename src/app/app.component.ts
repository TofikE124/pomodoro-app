import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { SmallIconComponent } from './components/small-icon/small-icon.component';
import { iconMap, iconType } from './constants/icons';
import { MultiSelectionComponent } from './components/multi-selection/multi-selection.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PrimaryButtonComponent,
    NumberInputComponent,
    SmallIconComponent,
    MultiSelectionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pomodoro-app';

  selections = ['a', 'b', 'c'];
}
