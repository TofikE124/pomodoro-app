import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SettingsService } from '../../../../../services/settings.service';
import { DropdownOption } from '../../../../dropdown/dropdown-option/dropdown-option.component';
import { DropdownComponent } from '../../../../dropdown/dropdown.component';
import { SliderComponent } from '../../../../slider/slider.component';
import {
  backgroundSoundsMap,
  BackgroundSoundType,
} from './../../../../../constants/sounds';
import { BackgroundSoundService } from './../../../../../services/audio/background-sound.service';

@Component({
  selector: 'background-sound',
  standalone: true,
  imports: [DropdownComponent, SliderComponent, CommonModule],
  templateUrl: './background-sound.component.html',
  styleUrl: './background-sound.component.scss',
})
export class BackgroundSoundComponent {
  soundType$;
  volume$;
  constructor(
    private settingsService: SettingsService,
    private backgroundSoundService: BackgroundSoundService
  ) {
    this.soundType$ = backgroundSoundService.soundType$;
    this.volume$ = backgroundSoundService.volume$;
  }

  value: string = '';

  options: DropdownOption[] = [
    { label: 'None', value: null },
    ...Object.entries(backgroundSoundsMap).map(([type, obj]) => ({
      label: obj.label,
      value: type,
    })),
  ];

  dropDownValueChange(value: string | number | null) {
    this.settingsService.setBackgroundSound(value as BackgroundSoundType);
  }
  volumeValueChange(value: number) {
    this.settingsService.setBackgroundSoundVolume(value);
  }
}
