import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PomodoroMode } from '../constants/modes';
import { SaveableService } from './settings.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PomodoroCycleService implements SaveableService {
  private longBreakIntervalSubject = new BehaviorSubject<number>(2);
  private cycle: PomodoroMode[] = [];

  private currentModeIndex: number = 0;

  constructor(private localStorageService: LocalStorageService) {
    this.intializeLongBreakInterval();
    this.updateCycle();
  }

  private updateCycle() {
    const cycleLength = this.longBreakIntervalSubject.value;
    this.cycle = [];

    for (let i = 0; i < cycleLength - 1; i++) {
      this.cycle.push(PomodoroMode.POMODORO, PomodoroMode.SHORT_BREAK);
    }
    this.cycle.push(PomodoroMode.POMODORO, PomodoroMode.LONG_BREAK);
  }

  getNextMode(): PomodoroMode {
    this.currentModeIndex = (this.currentModeIndex + 1) % this.cycle.length;
    return this.cycle[this.currentModeIndex];
  }

  setLongBreakInterval(length: number) {
    this.longBreakIntervalSubject.next(length);
    this.updateCycle();
  }

  save() {
    if (this.localStorageService.localStorageExists()) {
      this.storeLongBreakInterval(this.longBreakIntervalSubject.value);
    }
  }

  private intializeLongBreakInterval() {
    const storedLongBreakInterval = this.getStoredLongBreakInterval();
    const intialLongBreakInterval = storedLongBreakInterval ?? 4;
    this.longBreakIntervalSubject.next(intialLongBreakInterval);
  }

  private getStoredLongBreakInterval() {
    if (this.localStorageService.localStorageExists()) {
      const storedLongBreakIntervals =
        localStorage.getItem('longBreakInterval');
      if (storedLongBreakIntervals) return parseInt(storedLongBreakIntervals);
    }
    return null;
  }

  private storeLongBreakInterval(longBreakInterval: number) {
    localStorage.setItem(
      'longBreakInterval',
      JSON.stringify(longBreakInterval)
    );
  }
}
