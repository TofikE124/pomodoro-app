import { Injectable } from '@angular/core';
import { SoundManagerService } from './sound-manager.service';
import {
  backgroundSoundsMap,
  BackgroundSoundType,
  SoundType,
} from '../../constants/sounds';
import { TimerState } from '../timer/timer.service';

@Injectable({
  providedIn: 'root',
})
export class BackgroundSoundService extends SoundManagerService<SoundType.BACKGROUND_SOUND> {
  protected override testSoundDuration: number = 4000;
  protected override getSoundType(): any {
    return SoundType.BACKGROUND_SOUND;
  }

  protected override playCheck(timerState: TimerState): {
    play: boolean;
    duration?: number | undefined;
    loop: boolean;
  } {
    return { play: timerState == TimerState.RUNNING, loop: true };
  }

  protected override stopCheck(timerState: TimerState): boolean {
    return timerState == TimerState.PAUSED;
  }

  override setSound(backgroundSoundType: BackgroundSoundType, volume?: number) {
    this.setGenericSound(backgroundSoundsMap[backgroundSoundType], volume);
  }
}
