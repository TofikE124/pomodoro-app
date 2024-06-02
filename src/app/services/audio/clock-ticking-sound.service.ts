import { Injectable } from '@angular/core';
import {
  clockTickingSoundsMap,
  ClockTickingSoundType,
  SoundType,
} from '../../constants/sounds';
import { TimerState } from '../timer.service';
import { SoundManagerService } from './sound-manager.service';

@Injectable({
  providedIn: 'root',
})
export class ClockTickingSoundService extends SoundManagerService<SoundType.TICKING_SOUND> {
  protected override getSoundType(): any {
    return SoundType.TICKING_SOUND;
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

  override setSound(clockTickingType: ClockTickingSoundType, volume?: number) {
    this.setGenericSound(clockTickingSoundsMap[clockTickingType], volume);
  }
}
