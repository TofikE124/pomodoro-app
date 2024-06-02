import { Component } from '@angular/core';
import { TickingSoundComponent } from './ticking-sound/ticking-sound.component';
import { BackgroundSoundComponent } from './background-sound/background-sound.component';
import { AlarmSoundComponent } from './alarm-sound/alarm-sound.component';

@Component({
  selector: 'sound',
  standalone: true,
  imports: [
    TickingSoundComponent,
    BackgroundSoundComponent,
    AlarmSoundComponent,
  ],
  templateUrl: './sound.component.html',
  styleUrl: './sound.component.scss',
})
export class SoundComponent {}
