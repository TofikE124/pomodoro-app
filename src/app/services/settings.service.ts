import { Injectable } from '@angular/core';
import { ColorDetails, ColorService } from './color.service';
import { Font, FontService } from './font.service';
import { TimerDurationService } from './timer-duration.service';
import { PomodoroMode } from '../constants/modes';

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
    private timerDurationService: TimerDurationService
  ) {
    this.servicesToSave = [colorService, fontService, timerDurationService];
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

  save() {
    this.servicesToSave.forEach((service) => service.save());
  }
}
