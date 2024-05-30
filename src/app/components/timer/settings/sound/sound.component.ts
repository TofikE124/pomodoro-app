import { Component } from '@angular/core';
import { TickingSoundComponent } from './ticking-sound/ticking-sound.component';

@Component({
  selector: 'sound',
  standalone: true,
  imports: [TickingSoundComponent],
  templateUrl: './sound.component.html',
  styleUrl: './sound.component.scss',
})
export class SoundComponent {}
