import { SwtichComponent } from './../../../../swtich/swtich.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PomodoroCycleService } from '../../../../../services/pomodoro-cycle.service';
import { SettingsService } from '../../../../../services/settings.service';

@Component({
  selector: 'auto-start-pomodoros',
  standalone: true,
  imports: [SwtichComponent, CommonModule],
  templateUrl: './auto-start-pomodoros.component.html',
  styleUrl: './auto-start-pomodoros.component.scss',
})
export class AutoStartPomodorosComponent {
  autoStartPomodoros$: Observable<boolean>;
  constructor(
    pomodoroCycleService: PomodoroCycleService,
    private settingsService: SettingsService
  ) {
    this.autoStartPomodoros$ = pomodoroCycleService.cycle$.pipe(
      map((x) => x.autoStartPomodoros)
    );
  }
  valueChanges(value: boolean) {
    this.settingsService.setAutoStartPomodoros(value);
  }
}
