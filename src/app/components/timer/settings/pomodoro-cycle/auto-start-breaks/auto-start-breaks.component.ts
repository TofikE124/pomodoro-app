import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SwtichComponent } from '../../../../swtich/swtich.component';
import { map, Observable } from 'rxjs';
import { PomodoroCycleService } from '../../../../../services/pomodoro-cycle.service';
import { SettingsService } from '../../../../../services/settings.service';

@Component({
  selector: 'auto-start-breaks',
  standalone: true,
  imports: [SwtichComponent, CommonModule],
  templateUrl: './auto-start-breaks.component.html',
  styleUrl: './auto-start-breaks.component.scss',
})
export class AutoStartBreaksComponent {
  autoStartBreaks$: Observable<boolean>;
  constructor(
    pomodoroCycleService: PomodoroCycleService,
    private settingsService: SettingsService
  ) {
    this.autoStartBreaks$ = pomodoroCycleService.cycle$.pipe(
      map((x) => x.autoStartBreaks)
    );
  }
  valueChanges(value: boolean) {
    this.settingsService.setAutoStartBreaks(value);
  }
}
