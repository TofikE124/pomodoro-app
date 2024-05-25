import { TimerDurationService } from './../../../../services/timer-duration.service';
import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PomodoroModeDetails, PomodoroMode } from '../../../../constants/modes';

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

  constructor(private timeDurationService: TimerDurationService) {}

  ngOnInit(): void {
    this.modeDetails = this.timeDurationService.getDurations()[this.mode];
  }
}
