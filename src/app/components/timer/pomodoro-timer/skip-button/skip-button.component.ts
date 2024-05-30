import { Component, OnInit } from '@angular/core';
import { SmallIconComponent } from '../../../small-icon/small-icon.component';
import { IconType } from '../../../../constants/icons';
import { TimerModeService } from '../../../../services/timer-mode.service';
import { KeyboardService } from '../../../../services/keyboard.service';

@Component({
  selector: 'skip-button',
  standalone: true,
  imports: [SmallIconComponent],
  templateUrl: './skip-button.component.html',
  styleUrl: './skip-button.component.scss',
})
export class SkipButtonComponent implements OnInit {
  nextIcon = IconType.NEXT;

  constructor(
    private timerModeService: TimerModeService,
    private keyboardService: KeyboardService
  ) {}

  ngOnInit(): void {
    this.keyboardService.register('ArrowRight', () => this.onClick());
  }

  onClick() {
    this.timerModeService.nextMode();
  }
}
