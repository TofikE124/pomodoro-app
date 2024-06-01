import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  defaultSoundSettings,
  SoundSetting,
  SoundType,
} from '../../constants/sounds';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export abstract class SoundSettingsService<T extends SoundType> {
  private readonly STORAGE_KEY = 'SOUND_SETTINGS_' + this.getSoundType();
  private soundSettingSubject: BehaviorSubject<SoundSetting> =
    new BehaviorSubject<SoundSetting>(
      defaultSoundSettings[this.getSoundType()]
    );
  soundSetting$: Observable<SoundSetting> =
    this.soundSettingSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    this.initializeSoundSetting();
  }

  protected abstract getSoundType(): T;

  private initializeSoundSetting() {
    const storedSoundSetting = this.getStoredSoundSetting();
    if (storedSoundSetting) {
      this.soundSettingSubject.next(storedSoundSetting);
    }
  }

  getSound(): SoundSetting {
    return this.soundSettingSubject.value;
  }
  getURL(): string {
    return this.soundSettingSubject.value.details?.url || '';
  }

  updateSoundSetting(updatedSetting: SoundSetting) {
    this.soundSettingSubject.next(updatedSetting);
  }

  private getStoredSoundSetting(): SoundSetting | null {
    const storedValue = this.localStorageService.get(this.STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  private saveSoundSettingToLocalStorage(soundSettings: SoundSetting) {
    this.localStorageService.set(
      this.STORAGE_KEY,
      JSON.stringify(soundSettings)
    );
  }

  save() {
    this.saveSoundSettingToLocalStorage(this.soundSettingSubject.value);
  }
}
