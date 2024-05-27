import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SaveableService } from './settings.service';
import { LocalStorageService } from './local-storage.service';

export enum Color {
  DARK_RED = 'Dark Red',
  LIGHT_BLUE = 'Light Blue',
  LIGHT_PURPLE = 'Light Purple',
}

export interface ColorDetails {
  value: string;
  type: Color;
}

@Injectable({
  providedIn: 'root',
})
export class ColorService implements SaveableService {
  colors: Record<Color, ColorDetails> = {
    [Color.DARK_RED]: { value: '#F87070', type: Color.DARK_RED },
    [Color.LIGHT_BLUE]: { value: '#70F3F8', type: Color.LIGHT_BLUE },
    [Color.LIGHT_PURPLE]: { value: '#D881F8', type: Color.LIGHT_PURPLE },
  };

  private selectedColorDetailsSubject = new BehaviorSubject<ColorDetails>(
    this.colors[Color.DARK_RED]
  );
  selectedColorDetails$: Observable<ColorDetails> =
    this.selectedColorDetailsSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    this.initializeSelectedColor();
  }

  private initializeSelectedColor() {
    const storedColorType = this.getStoredColorType();
    const initialColor = storedColorType
      ? this.colors[storedColorType]
      : this.colors[Color.DARK_RED];
    this.selectColor(initialColor);
  }

  selectColor(colorDetails: ColorDetails) {
    this.selectedColorDetailsSubject.next(colorDetails);
    this.applyColorAsCssVariable(colorDetails.value);
  }

  save() {
    const selectedColorDetails = this.selectedColorDetailsSubject.getValue();
    if (this.localStorageService.localStorageExists()) {
      this.storeColorType(selectedColorDetails.type);
    }
  }

  private applyColorAsCssVariable(colorValue: string) {
    if (this.documentExists()) {
      document.documentElement.style.setProperty('--schemeColor', colorValue);
    }
  }

  private getStoredColorType(): Color | null {
    if (this.localStorageService.localStorageExists()) {
      return localStorage.getItem('color') as Color | null;
    }
    return null;
  }

  private storeColorType(colorType: Color) {
    localStorage.setItem('color', colorType);
  }

  private documentExists(): boolean {
    return typeof document !== 'undefined';
  }
}
