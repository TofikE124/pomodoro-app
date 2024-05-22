import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { modeMap, ModeType, PomodoroMode } from '../../../../constants/modes';

@Component({
  selector: 'timer-mode-selection',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './timer-mode-selection.component.html',
  styleUrl: './timer-mode-selection.component.scss',
})
export class TimerModeSelectionComponent implements OnInit {
  @Input('value') value!: PomodoroMode;
  @Input('selected') selected: boolean = false;
  @Output('select') select: EventEmitter<PomodoroMode> = new EventEmitter();

  mode?: ModeType;

  ngOnInit(): void {
    this.mode = modeMap[this.value];
  }
}
