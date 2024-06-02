import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PomodoroMode, PomodoroModeDetails } from '../../../../constants/modes';
import { TimerDurationService } from '../../../../services/timer/timer-duration.service';
import { NumberInputComponent } from '../../../number-input/number-input.component';
import { map } from 'rxjs';

@Component({
  selector: 'mode-duration-settings',
  standalone: true,
  imports: [NumberInputComponent, NgFor, CommonModule],
  templateUrl: './mode-duration-settings.component.html',
  styleUrl: './mode-duration-settings.component.scss',
})
export class ModeDurationSettingsComponent {
  constructor(private timeDurationService: TimerDurationService) {}

  durations$ = this.timeDurationService.durations$;

  // Method to handle duration change for a specific mode
  onDurationChange(mode: PomodoroMode | string, duration: number) {
    this.timeDurationService.updateDuration(mode as PomodoroMode, duration);
  }

  // Method to save the updated durations to local storage
  saveDurations() {
    this.timeDurationService.save();
  }

  trackByFn(index: number, item: any) {
    return index;
  }

  orderByFn() {}
}
