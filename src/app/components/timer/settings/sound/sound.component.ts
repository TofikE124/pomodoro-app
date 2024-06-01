import { Component } from '@angular/core';
import { TickingSoundComponent } from './ticking-sound/ticking-sound.component';
import { BackgroundSoundComponent } from './background-sound/background-sound.component';

@Component({
  selector: 'sound',
  standalone: true,
  imports: [TickingSoundComponent, BackgroundSoundComponent],
  templateUrl: './sound.component.html',
  styleUrl: './sound.component.scss',
})
export class SoundComponent {}
