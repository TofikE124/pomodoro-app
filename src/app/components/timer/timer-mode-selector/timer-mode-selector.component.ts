import { CommonModule, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PomodoroMode } from '../../../constants/modes';
import { TimerModeService } from '../../../services/timer/timer-mode.service';
import { TimerModeSelectionComponent } from './timer-mode-selection/timer-mode-selection.component';

@Component({
  selector: 'timer-mode-selector',
  standalone: true,
  imports: [TimerModeSelectionComponent, NgFor, CommonModule],
  templateUrl: './timer-mode-selector.component.html',
  styleUrl: './timer-mode-selector.component.scss',
})
export class TimerModeSelectorComponent implements OnInit, OnDestroy {
  availableModes = Object.values(PomodoroMode) as PomodoroMode[];
  currentMode?: PomodoroMode;
  currentModeSubscription?: Subscription;

  constructor(private timerModeService: TimerModeService) {}

  ngOnInit(): void {
    this.currentModeSubscription =
      this.timerModeService.currentMode$?.subscribe((currentMode) => {
        this.currentMode = currentMode;
      });
  }

  ngOnDestroy(): void {
    this.currentModeSubscription?.unsubscribe();
  }

  onSelect(selection: PomodoroMode) {
    this.timerModeService.changeMode(selection);
  }
}
