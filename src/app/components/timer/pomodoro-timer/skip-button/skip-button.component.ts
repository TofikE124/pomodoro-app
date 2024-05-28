import { Component } from '@angular/core';
import { SmallIconComponent } from '../../../small-icon/small-icon.component';
import { IconType } from '../../../../constants/icons';
import { TimerModeService } from '../../../../services/timer-mode.service';

@Component({
  selector: 'skip-button',
  standalone: true,
  imports: [SmallIconComponent],
  templateUrl: './skip-button.component.html',
  styleUrl: './skip-button.component.scss',
})
export class SkipButtonComponent {
  nextIcon = IconType.NEXT;

  constructor(private timerModeService: TimerModeService) {}

  onClick() {
    this.timerModeService.nextMode();
  }
}
