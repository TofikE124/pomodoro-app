import { Component } from '@angular/core';
import { SmallIconComponent } from '../../small-icon/small-icon.component';
import { IconType } from '../../../constants/icons';
import { SettingsPanelComponent } from './settings-panel/settings-panel.component';

@Component({
  selector: 'settings',
  standalone: true,
  imports: [SettingsPanelComponent, SmallIconComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  settingsIcon = IconType.SETTINGS;

  isSettingsOpen = true;
  openSettings() {
    this.isSettingsOpen = true;
  }
  closeSettings() {
    this.isSettingsOpen = false;
  }
}
