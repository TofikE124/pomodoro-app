import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  defaultSoundSettings,
  SoundDetails,
  SoundSettings,
  SoundType,
} from '../../constants/sounds';
import { LocalStorageService } from '../local-storage.service';
import { TimerService, TimerState } from '../timer.service';
import { AudioService } from './audio.service';

@Injectable({
  providedIn: 'root',
})
export abstract class SoundManagerService {
  protected readonly STORAGE_KEY = 'soundSettings';
  soundSettingsSubject: BehaviorSubject<SoundSettings> =
    new BehaviorSubject<SoundSettings>(defaultSoundSettings);
  soundSettings$ = this.soundSettingsSubject.asObservable();

  // true if the playCheck is true
  protected isActive: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private audioService: AudioService,
    timerService: TimerService
  ) {
    this.initializeSoundSettings();

    timerService.timerState$.subscribe((timerState) => {
      if (this.playCheck(timerState)) {
        this.isActive = true;
        this.playSoundRepeatdly();
      }
      if (this.stopCheck(timerState)) {
        this.isActive = false;
        this.pauseSound();
      }
    });
  }

  protected abstract playCheck(timerState: TimerState): boolean;

  protected abstract stopCheck(timerState: TimerState): boolean;

  private initializeSoundSettings() {
    const storedSoundSettings = this.getStoredSoundSettings();
    if (storedSoundSettings) {
      this.soundSettingsSubject.next(storedSoundSettings);
    }
  }

  protected abstract getSound(): {
    details: SoundDetails | null;
    volume: number;
  };

  protected setGenericSound(
    soundDetails: SoundDetails,
    soundType: SoundType,
    volume?: number
  ) {
    const currentSettings = this.soundSettingsSubject.value;
    const updatedSettings: SoundSettings = {
      ...currentSettings,
      [soundType]: {
        details: soundDetails,
        volume: volume ?? currentSettings[soundType].volume,
      },
    };
    this.soundSettingsSubject.next(updatedSettings);
  }

  protected setGenericSoundVolume(soundType: SoundType, volume?: number) {
    const currentSettings = this.soundSettingsSubject.value;
    const updatedSettings: SoundSettings = {
      ...currentSettings,
      [soundType]: {
        ...currentSettings[soundType],
        volume: volume,
      },
    };
    this.soundSettingsSubject.next(updatedSettings);
  }

  abstract setSound(soundDetails: any, volume?: number): any;
  abstract setVolume(volume: number): any;

  protected playSoundRepeatdly() {
    const tickingSound = this.getSound();
    if (!tickingSound.details) return;
    const { url } = tickingSound.details;
    const { volume } = tickingSound;
    this.audioService.playSoundRepeatedly(url, volume);
  }

  protected playSoundDuration(duration: number) {
    const tickingSound = this.getSound();
    if (!tickingSound.details) return;
    const { url } = tickingSound.details;
    const { volume } = tickingSound;
    this.audioService.playSoundDuration(url, duration, volume);
  }

  protected pauseSound() {
    this.audioService.pauseSound();
  }

  private getStoredSoundSettings(): SoundSettings | null {
    const storedValue = this.localStorageService.get(this.STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  private saveSoundSettingsToLocalStorage(soundSettings: SoundSettings) {
    this.localStorageService.set(
      this.STORAGE_KEY,
      JSON.stringify(soundSettings)
    );
  }

  save() {
    const currentSettings = this.soundSettingsSubject.value;
    if (currentSettings) {
      this.saveSoundSettingsToLocalStorage(currentSettings);
    }
  }
}
