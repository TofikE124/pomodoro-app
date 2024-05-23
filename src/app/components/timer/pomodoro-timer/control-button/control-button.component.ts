import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlButtonDetails } from '../../../../services/timer.service';
import { TimerService } from './../../../../services/timer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'control-button',
  templateUrl: './control-button.component.html',
  styleUrls: ['./control-button.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class ControlButtonComponent implements OnInit {
  constructor(private timerService: TimerService) {}

  currentControlButtonDetails$?: Observable<ControlButtonDetails>;

  ngOnInit(): void {
    this.currentControlButtonDetails$ =
      this.timerService.currentControlButtonDetails$;
  }
}
