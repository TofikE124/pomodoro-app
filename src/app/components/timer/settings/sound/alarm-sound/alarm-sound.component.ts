import { AlarmSoundService } from './../../../../../services/audio/alarm-sound.service';
import { Component } from '@angular/core';
import { SoundOptionsComponent } from '../sound-options/sound-options.component';
import { CommonModule } from '@angular/common';
import {
  alarmSoundMap,
  AlarmSoundType,
  backgroundSoundsMap,
  BackgroundSoundType,
} from '../../../../../constants/sounds';
import { BackgroundSoundService } from '../../../../../services/audio/background-sound.service';
import { SettingsService } from '../../../../../services/settings.service';
import { DropdownOption } from '../../../../dropdown/dropdown-option/dropdown-option.component';

@Component({
  selector: 'alarm-sound',
  standalone: true,
  imports: [SoundOptionsComponent, CommonModule],
  templateUrl: './alarm-sound.component.html',
  styleUrl: './alarm-sound.component.scss',
})
export class AlarmSoundComponent {
  soundType$;
  volume$;
  constructor(
    private settingsService: SettingsService,
    private alarmSoundService: AlarmSoundService
  ) {
    this.soundType$ = alarmSoundService.soundType$;
    this.volume$ = alarmSoundService.volume$;
  }

  options: DropdownOption[] = [
    ...Object.entries(alarmSoundMap).map(([type, obj]) => ({
      label: obj.label,
      value: type,
    })),
  ];

  typeChange(value: string | number | null) {
    this.settingsService.setAlarmSound(value as AlarmSoundType);
  }
  volumeValueChange(value: number) {
    this.settingsService.setAlarmSoundVolume(value);
  }
}
