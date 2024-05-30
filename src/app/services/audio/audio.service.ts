import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio?: HTMLAudioElement;

  constructor() {}

  private playSound(filePath: string) {
    if (typeof Audio === 'undefined' || typeof document === 'undefined') return;
    this.audio = new Audio();
    this.audio.src = filePath;
    this.audio.load();
  }

  playSoundDuration(
    filePath: string,
    duration: number,
    volume: number = 1
  ): void {
    this.playSound(filePath);
    console.log(filePath, duration, volume);
    if (!this.audio) return;
    this.audio.volume = volume / 100; // Volume is expected to be between 0-100
    this.audio.play();
    setTimeout(() => {
      this.audio?.pause();
    }, duration);
  }

  playSoundRepeatedly(filePath: string, volume: number = 1): void {
    this.playSound(filePath);
    if (!this.audio) return;
    this.audio.volume = volume / 100; // Volume is expected to be between 0-100
    this.audio.play();
    this.audio.loop = true;
  }

  pauseSound(): void {
    if (!this.audio) return;
    this.audio.pause();
    this.audio.currentTime = 0; // Reset the audio to the beginning
  }

  continueSound(): void {
    if (this.audio && this.audio.paused) {
      this.audio.play();
    }
  }

  setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = volume / 100; // Volume is expected to be between 0-100
    }
  }
}
