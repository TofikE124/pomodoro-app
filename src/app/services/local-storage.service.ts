import { Injectable, Pipe } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  localStorageExists() {
    return typeof localStorage != 'undefined';
  }

  get(key: string) {
    if (!this.localStorageExists()) return;
    return localStorage.getItem(key);
  }

  set(key: string, obj: any) {
    if (!this.localStorageExists()) return;
    localStorage.setItem(key, obj);
  }
}
