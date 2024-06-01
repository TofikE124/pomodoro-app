import { SaveableService } from './../settings.service';
import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, Observable, skip } from 'rxjs';
import { SoundDetails, SoundSettings, SoundType } from '../../constants/sounds';
import { TimerService, TimerState } from '../timer.service';
import { AudioService } from './audio.service';
import { SoundSettingsService } from './sound-settings.service';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export abstract class SoundManagerService<T extends SoundType>
  extends SoundSettingsService<T>
  implements SaveableService
{
  volume$: Observable<number> = this.soundSetting$.pipe(
    map((setting) => setting.volume),
    distinctUntilChanged()
  );

  soundType$: Observable<any | null> = this.soundSetting$.pipe(
    map((setting, index) => setting.details?.type || null),
    distinctUntilChanged()
  );

  protected testSoundDuration = 2000;

  protected isActive: boolean = false;

  constructor(
    private audioService: AudioService,
    private timerService: TimerService,
    localStorageService: LocalStorageService
  ) {
    super(localStorageService);

    timerService.timerState$.subscribe((timerState) => {
      if (this.playCheck(timerState)) this.playSoundRepeatdly();
      if (this.stopCheck(timerState)) this.pauseSound();
    });

    this.volume$
      .pipe(skip(1))
      .subscribe((volume) => this.onVolumeChange(volume));

    this.soundType$.pipe(skip(1)).subscribe((type) => this.onTypeChange());
  }

  protected abstract playCheck(timerState: TimerState): boolean;

  protected abstract stopCheck(timerState: TimerState): boolean;

  protected setGenericSound(soundDetails: SoundDetails, volume?: number) {
    const currentSound = this.getSound();
    this.updateSoundSetting({
      details: soundDetails,
      volume: volume ?? currentSound.volume,
    });
  }

  setVolume(volume: number) {
    const currentSound = this.getSound();
    this.updateSoundSetting({ ...currentSound, volume });
  }

  abstract setSound(soundDetails: any, volume?: number): any;

  protected playSoundRepeatdly() {
    const sound = this.getSound();
    if (!sound.details) return;
    this.isActive = true;
    const { url } = sound.details;
    const { volume } = sound;
    this.audioService.playSoundRepeatedly(url, volume, this.getSoundType());
  }

  protected playSoundDuration(duration: number) {
    const sound = this.getSound();
    if (!sound.details) return;
    const { url } = sound.details;
    const { volume } = sound;
    this.audioService.playSoundDuration(
      url,
      duration,
      volume,
      this.getSoundType()
    );
  }

  protected pauseSound() {
    this.isActive = false;
    this.audioService.pauseSound(this.getURL());
  }

  protected onVolumeChange(volume: number) {
    if (this.audioService.isPlaying && this.isActive)
      this.audioService.setVolume(this.getURL(), volume);
    else {
      if (this.isActive) this.playSoundRepeatdly();
      else this.playSoundDuration(this.testSoundDuration);
    }
  }
  protected onTypeChange() {
    if (this.isActive) this.playSoundRepeatdly();
    else this.playSoundDuration(this.testSoundDuration);
  }
}
