import { Injectable } from '@angular/core';
import { ColorDetails, ColorService } from './color.service';
import { Font, FontService } from './font.service';
import { TimerDurationService } from './timer-duration.service';
import { PomodoroMode } from '../constants/modes';
import { PomodoroCycleService } from './pomodoro-cycle.service';

export interface SaveableService {
  save: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private servicesToSave: SaveableService[] = [];

  constructor(
    private colorService: ColorService,
    private fontService: FontService,
    private timerDurationService: TimerDurationService,
    private pomodoroCycleService: PomodoroCycleService
  ) {
    this.servicesToSave = [
      colorService,
      fontService,
      timerDurationService,
      pomodoroCycleService,
    ];
  }

  setColor(colorDetails: ColorDetails) {
    this.colorService.selectColor(colorDetails);
  }
  setFont(font: Font) {
    this.fontService.selectFont(font);
  }

  updateDuration(mode: PomodoroMode, duration: number) {
    this.timerDurationService.updateDuration(mode, duration);
  }

  setLongBreakInterval(longBreakInterval: number) {
    this.pomodoroCycleService.setLongBreakInterval(longBreakInterval);
  }

  setAutoStartPomodoros(autoStart: boolean) {
    this.pomodoroCycleService.setAutoStartPomodoros(autoStart);
  }
  setAutoStartBreaks(autoStart: boolean) {
    this.pomodoroCycleService.setAutoStartBreaks(autoStart);
  }

  save() {
    this.servicesToSave.forEach((service) => service.save());
  }
}
