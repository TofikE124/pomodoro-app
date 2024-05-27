import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  PomodoroMode,
  PomodoroModeDetails,
  pomodoroModeDetailsMap,
} from '../constants/modes';
import { SaveableService } from './settings.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TimerDurationService implements SaveableService {
  private durationsSubject = new BehaviorSubject<
    Record<PomodoroMode, PomodoroModeDetails>
  >(pomodoroModeDetailsMap);
  durations$ = this.durationsSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    this.loadDurationsFromStorage();
  }

  getDetails(): Record<PomodoroMode, PomodoroModeDetails> {
    return this.durationsSubject.value;
  }

  updateDuration(mode: PomodoroMode, duration: number) {
    const currentDurations = this.durationsSubject.value;
    currentDurations[mode] = {
      ...currentDurations[mode],
      duration: duration * 60,
    };
    this.durationsSubject.next({ ...currentDurations });
  }

  save() {
    const currentDurations = this.durationsSubject.value;
    localStorage.setItem('pomodoroDurations', JSON.stringify(currentDurations));
  }

  private loadDurationsFromStorage() {
    if (this.localStorageService.localStorageExists()) {
      const storedDurations = localStorage.getItem('pomodoroDurations');
      if (storedDurations) {
        this.durationsSubject.next(JSON.parse(storedDurations));
      }
    }
  }
}
