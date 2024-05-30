import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IconType } from '../../../../constants/icons';
import { pomodoroModeDetailsMap } from '../../../../constants/modes';
import { SettingsService } from '../../../../services/settings.service';
import { MultiSelectionColorComponent } from '../multi-selection-color/multi-selection-color.component';
import { MultiSelectionComponent } from '../../../multi-selection/multi-selection.component';
import { NumberInputComponent } from '../../../number-input/number-input.component';
import { PrimaryButtonComponent } from '../../../primary-button/primary-button.component';
import { SmallIconComponent } from '../../../small-icon/small-icon.component';
import { ModeDurationSettingsComponent } from '../mode-duration-settings/mode-duration-settings.component';
import { MultiSelectionFontComponent } from '../multi-selection-font/multi-selection-font.component';
import { PomodoroCycleComponent } from '../pomodoro-cycle/pomodoro-cycle.component';
import { SoundComponent } from '../sound/sound.component';

@Component({
  selector: 'settings-panel',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    SmallIconComponent,
    NumberInputComponent,
    MultiSelectionComponent,
    PrimaryButtonComponent,
    MultiSelectionFontComponent,
    ModeDurationSettingsComponent,
    MultiSelectionColorComponent,
    PomodoroCycleComponent,
    SoundComponent,
  ],
  templateUrl: './settings-panel.component.html',
  styleUrl: './settings-panel.component.scss',
})
export class SettingsPanelComponent {
  @Input('isSettingsOpened') isSettingsOpened?: boolean;
  @Output('overlayClick') overlayClick: EventEmitter<void> = new EventEmitter();
  @Output('closeClick') closeClick: EventEmitter<void> = new EventEmitter();

  constructor(
    private settingsService: SettingsService,
    private toastr: ToastrService
  ) {}

  closeIcon = IconType.CLOSE;
  // Pomodoro
  pomodoroModeDetailsMapValues = Object.values(pomodoroModeDetailsMap);

  save() {
    this.settingsService.save();
    this.toastr.success('Saved Successfully', 'Saved', { timeOut: 1500 });
    this.closeClick.emit();
  }
}
