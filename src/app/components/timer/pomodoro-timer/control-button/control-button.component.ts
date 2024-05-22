import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

export enum ControlButtonMode {
  START,
  PAUSE,
  RESUME,
  RESET,
}

export type ControlButtonDetails = {
  label: string;
  onClick: () => void;
};

@Component({
  selector: 'control-button',
  templateUrl: './control-button.component.html',
  styleUrls: ['./control-button.component.scss'],
  standalone: true,
})
export class ControlButtonComponent implements OnInit {
  @Input('defaultControlButtonMode')
  defaultControlButtonMode?: ControlButtonMode;
  @Input('timerComplete$') timerComplete$?: EventEmitter<void>;
  @Output('startClick') startClick = new EventEmitter<void>();
  @Output('pauseClick') pauseClick = new EventEmitter<void>();
  @Output('resumeClick') resumeClick = new EventEmitter<void>();
  @Output('resetClick') resetClick = new EventEmitter<void>();

  controlButtonDetailsMap: Record<ControlButtonMode, ControlButtonDetails> = {
    [ControlButtonMode.START]: {
      label: 'start',
      onClick: () => {
        this.startClick.emit();
        this.changeControlButtonMode(ControlButtonMode.PAUSE);
      },
    },
    [ControlButtonMode.PAUSE]: {
      label: 'pause',
      onClick: () => {
        this.pauseClick.emit();
        this.changeControlButtonMode(ControlButtonMode.RESUME);
      },
    },
    [ControlButtonMode.RESUME]: {
      label: 'resume',
      onClick: () => {
        this.resumeClick.emit();
        this.changeControlButtonMode(ControlButtonMode.PAUSE);
      },
    },
    [ControlButtonMode.RESET]: {
      label: 'reset',
      onClick: () => {
        this.resetClick.emit();
        this.changeControlButtonMode(ControlButtonMode.START);
      },
    },
  };

  currentControlButton?: ControlButtonMode = ControlButtonMode.START;
  currentControlButtonDetails?: ControlButtonDetails =
    this.controlButtonDetailsMap[this.currentControlButton!];

  ngOnInit(): void {
    if (this.defaultControlButtonMode) {
      this.changeControlButtonMode(this.defaultControlButtonMode);
    }
    this.timerComplete$?.subscribe(() => {
      this.changeControlButtonMode(ControlButtonMode.RESET);
    });
  }

  changeControlButtonMode(controlButtonMode: ControlButtonMode) {
    this.currentControlButton = controlButtonMode;
    this.currentControlButtonDetails =
      this.controlButtonDetailsMap[controlButtonMode];
  }
}
