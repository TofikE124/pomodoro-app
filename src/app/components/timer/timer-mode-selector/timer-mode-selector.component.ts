import { Component, model, OnInit } from '@angular/core';
import { TimerModeSelectionComponent } from './timer-mode-selection/timer-mode-selection.component';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PomodoroMode } from '../../../constants/modes';

@Component({
  selector: 'timer-mode-selector',
  standalone: true,
  imports: [TimerModeSelectionComponent, NgFor],
  templateUrl: './timer-mode-selector.component.html',
  styleUrl: './timer-mode-selector.component.scss',
})
export class TimerModeSelectorComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  selections = Object.values(PomodoroMode) as PomodoroMode[];

  selectedMode?: PomodoroMode;

  onSelect(selection: PomodoroMode) {
    this.changeMode(selection);
  }

  ngOnInit(): void {
    this.changeMode(PomodoroMode.POMODORO);

    this.route.queryParamMap.subscribe((queryParams) => {
      this.selectedMode = queryParams.get('mode')! as PomodoroMode;
    });
  }

  changeMode(mode: PomodoroMode) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        mode: mode,
      },
      queryParamsHandling: 'merge',
    });
  }
}
