import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IconType } from '../../../../constants/icons';
import { pomodoroModeDetailsMap } from '../../../../constants/modes';
import { ColorService } from '../../../../services/color.service';
import { FontService } from '../../../../services/font.service';
import { TimerDurationService } from '../../../../services/timer-duration.service';
import { MultiSelectionColorComponent } from '../../../multi-selection-color/multi-selection-color.component';
import { MultiSelectionFontComponent } from '../../../multi-selection-font/multi-selection-font.component';
import { MultiSelectionComponent } from '../../../multi-selection/multi-selection.component';
import { NumberInputComponent } from '../../../number-input/number-input.component';
import { PrimaryButtonComponent } from '../../../primary-button/primary-button.component';
import { SmallIconComponent } from '../../../small-icon/small-icon.component';
import { ModeDurationSettingsComponent } from '../mode-duration-settings/mode-duration-settings.component';

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
    MultiSelectionColorComponent,
    MultiSelectionFontComponent,
    ModeDurationSettingsComponent,
  ],
  templateUrl: './settings-panel.component.html',
  styleUrl: './settings-panel.component.scss',
})
export class SettingsPanelComponent {
  @Input('isSettingsOpened') isSettingsOpened?: boolean;
  @Output('overlayClick') overlayClick: EventEmitter<void> = new EventEmitter();
  @Output('closeClick') closeClick: EventEmitter<void> = new EventEmitter();

  constructor(
    private fontService: FontService,
    private colorService: ColorService,
    private timeDurationService: TimerDurationService,
    private toastr: ToastrService
  ) {}

  closeIcon = IconType.CLOSE;
  // Pomodoro
  pomodoroModeDetailsMapValues = Object.values(pomodoroModeDetailsMap);

  save() {
    this.fontService.save();
    this.colorService.save();
    this.timeDurationService.save();
    this.toastr.success('Saved Successfully', 'Saved', { timeOut: 1500 });
    this.closeClick.emit();
  }
}
