import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PomodoroCycleService } from '../../../../../services/pomodoro-cycle.service';
import { SettingsService } from '../../../../../services/settings.service';
import { CommonModule } from '@angular/common';
import { NumberInputComponent } from '../../../../number-input/number-input.component';

@Component({
  selector: 'long-break-interval',
  standalone: true,
  imports: [NumberInputComponent, CommonModule],
  templateUrl: './long-break-interval.component.html',
  styleUrl: './long-break-interval.component.scss',
})
export class LongBreakIntervalComponent {
  longBreakInterval$: Observable<number>;

  constructor(
    private settingsService: SettingsService,
    pomodoroCycleService: PomodoroCycleService
  ) {
    this.longBreakInterval$ = pomodoroCycleService.cycle$.pipe(
      map((x) => x.longBreakInterval)
    );
  }

  valueChanges(longBreakInterval: number) {
    this.settingsService.setLongBreakInterval(longBreakInterval);
  }
}
