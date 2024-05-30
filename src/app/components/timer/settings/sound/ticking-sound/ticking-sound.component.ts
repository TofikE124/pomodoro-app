import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClockTickingSoundService } from '../../../../../services/audio/clock-ticking-sound.service';
import { Option } from '../../../../dropdown/dropdown-option/dropdown-option.component';
import { DropdownComponent } from '../../../../dropdown/dropdown.component';
import {
  clockTickingMap,
  ClockTickingType,
} from './../../../../../constants/sounds';
import { SettingsService } from './../../../../../services/settings.service';
import { SliderComponent } from '../../../../slider/slider.component';

@Component({
  selector: 'ticking-sound',
  standalone: true,
  imports: [DropdownComponent, SliderComponent, CommonModule],
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

  options: Option[] = [
    { label: 'None', value: null },
    ...Object.entries(clockTickingMap).map(([type, obj]) => ({
      label: obj.label,
      value: type,
    })),
  ];

  dropDownValueChange(value: string | number | null) {
    this.settingsService.setTickingSound(value as ClockTickingType);
  }
  volumeValueChange(value: number) {
    this.settingsService.setTickingSoundVolume(value);
  }
}
