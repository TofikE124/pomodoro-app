import { Injectable } from '@angular/core';
import { SoundType } from '../../constants/sounds';
import { TimerState } from '../timer/timer.service';
import { alarmSoundMap, AlarmSoundType } from './../../constants/sounds';
import { SoundManagerService } from './sound-manager.service';

@Injectable({
  providedIn: 'root',
})
export class AlarmSoundService extends SoundManagerService<SoundType.ALARM_SOUND> {
  protected override testSoundDuration: number = 4000;
  protected override getSoundType(): any {
    return SoundType.ALARM_SOUND;
  }

  protected override playCheck(timerState: TimerState): {
    play: boolean;
    duration?: number;
    loop: boolean;
  } {
    return {
      play: timerState == TimerState.COMPLETED,
      duration: 3500,
      loop: false,
    };
  }

  protected override stopCheck(): boolean {
    return false;
  }

  override setSound(alarmSoundType: AlarmSoundType, volume?: number) {
    this.setGenericSound(alarmSoundMap[alarmSoundType], volume);
  }
}
