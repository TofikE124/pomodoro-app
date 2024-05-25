import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimerButtonService } from '../../../../services/timer-button.service';
import { ControlButtonDetails } from '../../../../services/timer.service';

@Component({
  selector: 'control-button',
  templateUrl: './control-button.component.html',
  styleUrls: ['./control-button.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class ControlButtonComponent implements OnInit {
  constructor(private timerButtonService: TimerButtonService) {}
  currentControlButtonDetails$?: Observable<ControlButtonDetails>;

  ngOnInit(): void {
    this.currentControlButtonDetails$ =
      this.timerButtonService.currentControlButtonDetails$;
  }
}
