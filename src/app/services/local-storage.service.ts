import { Injectable, Pipe } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  localStorageExists() {
    return typeof localStorage != 'undefined';
  }
}
