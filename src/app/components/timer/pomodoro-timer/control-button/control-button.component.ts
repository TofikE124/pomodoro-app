import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimerButtonService } from '../../../../services/timer-button.service';
import { ControlButtonDetails } from '../../../../services/timer.service';
import { KeyboardService } from '../../../../services/keyboard.service';

@Component({
  selector: 'control-button',
  templateUrl: './control-button.component.html',
  styleUrls: ['./control-button.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class ControlButtonComponent implements OnInit, OnDestroy {
  currentButtonDetialsSubscription?: Subscription;
  currentControlButtonDetails?: ControlButtonDetails;

  constructor(
    private timerButtonService: TimerButtonService,
    private keyboardService: KeyboardService
  ) {}

  ngOnInit(): void {
    this.currentButtonDetialsSubscription =
      this.timerButtonService.currentControlButtonDetails$?.subscribe(
        (currentButtonDetails) =>
          (this.currentControlButtonDetails = currentButtonDetails)
      );
    this.keyboardService.register(' ', () => this.onClick());
  }

  ngOnDestroy(): void {
    this.currentButtonDetialsSubscription?.unsubscribe();
  }

  onClick() {
    this.currentControlButtonDetails?.onClick();
  }
}
