import { Injectable } from '@angular/core';
import { Key } from '../constants/key';

type keyMapType = { [key in Key]: () => void };

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  private keyMap: keyMapType = {} as keyMapType;

  constructor() {
    this.listenForKeyEvents();
  }

  register(key: Key, callback: () => void) {
    this.keyMap[key] = callback;
  }

  private listenForKeyEvents() {
    if (!this.windowExists()) return;
    window.addEventListener('keydown', (event) => {
      const callback = this.keyMap[event.key as Key];
      if (callback) {
        callback();
      }
    });
  }

  windowExists() {
    return typeof window != 'undefined';
  }
}
