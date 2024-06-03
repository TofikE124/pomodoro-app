import { Injectable } from '@angular/core';
import { SoundType } from '../../constants/sounds';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioMap: Map<string, { audio: HTMLAudioElement; type: SoundType }> =
    new Map();
  private playDurationTimeOutMap: Map<HTMLAudioElement, NodeJS.Timeout> =
    new Map();

  constructor() {}

  private getOrCreateAudio(
    filePath: string,
    soundType: SoundType
  ): HTMLAudioElement {
    let audio = this.audioMap.get(filePath)?.audio;
    if (!audio) {
      audio = new Audio();
      audio.src = filePath;
      audio.load();
      this.audioMap.set(filePath, { audio, type: soundType });
    }
    return audio;
  }

  playSoundDuration(
    filePath: string,
    duration: number,
    volume: number = 1,
    soundType: SoundType
  ): void {
    this.pauseAllOfType(soundType);
    const audio = this.getOrCreateAudio(filePath, soundType);
    if (this.playDurationTimeOutMap.has(audio)) {
      clearTimeout(this.playDurationTimeOutMap.get(audio) as NodeJS.Timeout);
    }

    audio.volume = volume / 100; // Volume is expected to be between 0-100
    audio.play();

    const timeout = setTimeout(() => {
      audio.pause();
    }, duration);

    this.playDurationTimeOutMap.set(audio, timeout);
  }

  playSoundRepeatedly(
    filePath: string,
    volume: number = 1,
    soundType: SoundType
  ): void {
    this.pauseAllOfType(soundType);
    const audio = this.getOrCreateAudio(filePath, soundType);
    audio.volume = volume / 100; // Volume is expected to be between 0-100
    audio.loop = true;
    audio.play();
  }

  pauseSound(filePath: string): void {
    const audio = this.audioMap.get(filePath)?.audio;
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reset the audio to the beginning
    }
  }

  pauseAllOfType(soundType: SoundType) {
    for (const { type, audio } of this.audioMap.values())
      if (soundType == type) {
        audio.pause();
        clearTimeout(this.playDurationTimeOutMap.get(audio));
      }
  }

  continueSound(filePath: string): void {
    const audio = this.audioMap.get(filePath)?.audio;
    if (audio && audio.paused) {
      audio.play();
    }
  }

  setVolume(filePath: string, volume: number): void {
    const audio = this.audioMap.get(filePath)?.audio;
    if (audio) {
      audio.volume = volume / 100; // Volume is expected to be between 0-100
    }
  }

  get isPlaying(): boolean {
    for (const { audio } of this.audioMap.values()) {
      if (!audio.paused) {
        return true;
      }
    }
    return false;
  }
}
