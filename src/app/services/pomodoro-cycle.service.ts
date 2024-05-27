import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PomodoroMode } from '../constants/modes';
import { SaveableService } from './settings.service';
import { LocalStorageService } from './local-storage.service';

export interface PomodoroCycle {
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
}

@Injectable({
  providedIn: 'root',
})
export class PomodoroCycleService implements SaveableService {
  private cycleSubject = new BehaviorSubject<PomodoroCycle>({
    autoStartBreaks: false,
    autoStartPomodoros: false,
    longBreakInterval: 4,
  });

  private cycle: PomodoroMode[] = [];
  private currentModeIndex: number = 0;

  cycle$: Observable<PomodoroCycle> = this.cycleSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    this.initializeCycle();
    this.updateCycle();
  }

  private updateCycle() {
    const { longBreakInterval } = this.cycleSubject.value;
    this.cycle = [];

    for (let i = 0; i < longBreakInterval - 1; i++) {
      this.cycle.push(PomodoroMode.POMODORO, PomodoroMode.SHORT_BREAK);
    }
    this.cycle.push(PomodoroMode.POMODORO, PomodoroMode.LONG_BREAK);
  }

  getNextMode(): PomodoroMode {
    this.currentModeIndex = (this.currentModeIndex + 1) % this.cycle.length;
    return this.cycle[this.currentModeIndex];
  }

  setLongBreakInterval(length: number) {
    const currentCycle = this.cycleSubject.value;
    this.cycleSubject.next({ ...currentCycle, longBreakInterval: length });
    this.updateCycle();
  }

  setAutoStartPomodoros(autoStartPomodoros: boolean) {
    const currentCycle = this.cycleSubject.value;
    this.cycleSubject.next({ ...currentCycle, autoStartPomodoros });
  }

  setAutoStartBreaks(autoStartBreaks: boolean) {
    const currentCycle = this.cycleSubject.value;
    this.cycleSubject.next({ ...currentCycle, autoStartBreaks });
  }

  getAutoStartPomodoros() {
    return this.cycleSubject.value.autoStartPomodoros;
  }
  getAutoStartBreaks() {
    return this.cycleSubject.value.autoStartBreaks;
  }

  save() {
    if (this.localStorageService.localStorageExists()) {
      this.storeCycle(this.cycleSubject.value);
    }
  }

  private initializeCycle() {
    const storedCycle = this.getStoredCycle();
    const initialCycle = storedCycle ?? {
      autoStartBreaks: false,
      autoStartPomodoros: false,
      longBreakInterval: 4,
    };
    this.cycleSubject.next(initialCycle);
  }

  private getStoredCycle() {
    if (this.localStorageService.localStorageExists()) {
      const storedCycle = localStorage.getItem('pomodoroCycle');
      if (storedCycle) return JSON.parse(storedCycle) as PomodoroCycle;
    }
    return null;
  }

  private storeCycle(cycle: PomodoroCycle) {
    localStorage.setItem('pomodoroCycle', JSON.stringify(cycle));
  }
}
