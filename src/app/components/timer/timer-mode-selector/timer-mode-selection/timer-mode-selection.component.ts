import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  pomodoroModeDetailsMap,
  PomodoroModeDetails,
  PomodoroMode,
} from '../../../../constants/modes';

@Component({
  selector: 'timer-mode-selection',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './timer-mode-selection.component.html',
  styleUrl: './timer-mode-selection.component.scss',
})
export class TimerModeSelectionComponent implements OnInit {
  @Input('mode') mode!: PomodoroMode;
  @Input('selected') selected: boolean = false;
  @Output('modeSelect') modeSelect: EventEmitter<PomodoroMode> =
    new EventEmitter();

  modeDetails?: PomodoroModeDetails;

  ngOnInit(): void {
    this.modeDetails = pomodoroModeDetailsMap[this.mode];
  }
}
