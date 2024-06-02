import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClockTickingSoundService } from '../../../../../services/audio/clock-ticking-sound.service';
import { DropdownOption } from '../../../../dropdown/dropdown-option/dropdown-option.component';
import { SoundOptionsComponent } from '../sound-options/sound-options.component';
import {
  ClockTickingSoundType,
  clockTickingSoundsMap,
} from './../../../../../constants/sounds';
import { SettingsService } from './../../../../../services/settings.service';

@Component({
  selector: 'ticking-sound',
  standalone: true,
  imports: [SoundOptionsComponent, CommonModule],
  templateUrl: './ticking-sound.component.html',
  styleUrl: './ticking-sound.component.scss',
})
export class TickingSoundComponent {
  soundType$;
  volume$;
  constructor(
    private settingsService: SettingsService,
    private clockTickingSoundService: ClockTickingSoundService
  ) {
    this.soundType$ = clockTickingSoundService.soundType$;
    this.volume$ = clockTickingSoundService.volume$;
  }

  value: string = '';

  options: DropdownOption[] = [
    { label: 'None', value: null },
    ...Object.entries(clockTickingSoundsMap).map(([type, obj]) => ({
      label: obj.label,
      value: type,
    })),
  ];

  typeChange(value: string | number | null) {
    this.settingsService.setTickingSound(value as ClockTickingSoundType);
  }
  volumeValueChange(value: number) {
    this.settingsService.setTickingSoundVolume(value);
  }
}
