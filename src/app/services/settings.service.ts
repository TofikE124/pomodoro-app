import { ClockTickingType, SoundDetails } from './../constants/sounds';
import { Injectable } from '@angular/core';
import { Font, FontService } from './font.service';
import { TimerDurationService } from './timer-duration.service';
import { PomodoroMode } from '../constants/modes';
import { PomodoroCycleService } from './pomodoro-cycle.service';
import { ColorDetails } from '../constants/colors';
import { ColorService } from './color.service';
import { ClockTickingSoundService } from './audio/clock-ticking-sound.service';

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
    private pomodoroCycleService: PomodoroCycleService,
    private clockTickingSoundService: ClockTickingSoundService
  ) {
    this.servicesToSave = [
      colorService,
      fontService,
      timerDurationService,
      pomodoroCycleService,
      clockTickingSoundService,
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

  setTickingSound(tickingType: ClockTickingType) {
    this.clockTickingSoundService.setSound(tickingType);
  }
  setTickingSoundVolume(volume: number) {
    this.clockTickingSoundService.setVolume(volume);
  }

  save() {
    this.servicesToSave.forEach((service) => service.save());
  }
}
