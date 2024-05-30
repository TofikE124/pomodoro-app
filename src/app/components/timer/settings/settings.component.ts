import { Component, OnInit } from '@angular/core';
import { SmallIconComponent } from '../../small-icon/small-icon.component';
import { IconType } from '../../../constants/icons';
import { SettingsPanelComponent } from './settings-panel/settings-panel.component';
import { KeyboardService } from '../../../services/keyboard.service';

@Component({
  selector: 'settings',
  standalone: true,
  imports: [SettingsPanelComponent, SmallIconComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  settingsIcon = IconType.SETTINGS;

  isSettingsOpen = true;

  constructor(private keyboardService: KeyboardService) {}

  ngOnInit(): void {
    this.keyboardService.register('Escape', () => {
      this.closeSettings();
    });
    this.keyboardService.register('s', () => {
      this.openSettings();
    });
  }

  openSettings() {
    this.isSettingsOpen = true;
  }
  closeSettings() {
    this.isSettingsOpen = false;
  }
}
