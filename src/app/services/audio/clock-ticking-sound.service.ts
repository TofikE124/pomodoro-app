import { Injectable, OnInit } from '@angular/core';
import {
  clockTickingMap,
  ClockTickingType,
  SoundDetails,
  SoundType,
} from '../../constants/sounds';
import { TimerState } from '../timer.service';
import { SoundManagerService } from './sound-manager.service';
import { map, Observable, skip } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClockTickingSoundService extends SoundManagerService {
  soundType$?: Observable<ClockTickingType | null> = this.soundSettings$.pipe(
    map((settings, index) => {
      if (index) this.debounceVolume();
      return settings['Ticking Sound'].details?.type || null;
    })
  );

  volume$?: Observable<number> = this.soundSettings$.pipe(
    map((settings, index) => {
      if (index) this.debounceVolume();
      return settings['Ticking Sound'].volume;
    })
  );

  private volumeTimerOut?: NodeJS.Timeout;
  private debounceVolume() {
    this.clearVolumeTimeOut();
    this.volumeTimerOut = setTimeout(() => {
      this.pauseSound();
      if (this.isActive) this.playSoundRepeatdly();
      else this.playSoundDuration(2000);
    }, 250);
  }

  clearVolumeTimeOut() {
    if (!this.volumeTimerOut) return;
    clearTimeout(this.volumeTimerOut);
  }

  protected override playCheck(timerState: TimerState): boolean {
    return timerState == TimerState.RUNNING;
  }
  protected override stopCheck(timerState: TimerState): boolean {
    return timerState == TimerState.PAUSED;
  }
  protected override getSound(): {
    details: SoundDetails | null;
    volume: number;
  } {
    return this.soundSettingsSubject.value['Ticking Sound'];
  }

  override setSound(clockTickingType: ClockTickingType, volume?: number) {
    this.setGenericSound(
      clockTickingMap[clockTickingType],
      SoundType.TICKING_SOUND,
      volume
    );
  }

  override setVolume(volume: number) {
    this.setGenericSoundVolume(SoundType.TICKING_SOUND, volume);
  }
}
