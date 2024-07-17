import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimerButtonService } from '../../../../services/timer/timer-button.service';
import { ControlButtonDetails } from '../../../../services/timer/timer.service';
import { KeyboardService } from '../../../../services/keyboard.service';
import { AudioService } from '../../../../services/audio/audio.service';

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
    private keyboardService: KeyboardService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.currentButtonDetialsSubscription =
      this.timerButtonService.currentControlButtonDetails$?.subscribe(
        (currentButtonDetails) =>
          (this.currentControlButtonDetails = currentButtonDetails)
      );
    this.keyboardService.register(' ', () => {
      this.currentControlButtonDetails?.onClick();
      this.playClickSound();
    });
  }

  ngOnDestroy(): void {
    this.currentButtonDetialsSubscription?.unsubscribe();
  }

  onClick(event: any) {
    if (event.pointerType) {
      this.currentControlButtonDetails?.onClick();
      this.playClickSound();
    }
  }

  playClickSound() {
    this.audioService.playSound('/assets/sounds/other/button.wav', 100);
  }
}
