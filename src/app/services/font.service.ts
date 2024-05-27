import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Selection } from '../components/multi-selection/selection/selection.component';
import { SaveableService } from './settings.service';
import { LocalStorageService } from './local-storage.service';

export enum Font {
  KUMBH_SANS = 'Kumbh Sans',
  ROBOTO_SLAB = 'Roboto Slab',
  SPACE_MONO = 'Space Mono',
}

@Injectable({
  providedIn: 'root',
})
export class FontService implements SaveableService {
  private fontDetailsSubject?: BehaviorSubject<Selection>;
  fontDetails$?: Observable<Selection>;

  fontDetailsMap: Record<Font, Selection> = {
    [Font.KUMBH_SANS]: {
      font: Font.KUMBH_SANS,
      label: 'Aa',
      value: 'KUMBH_SANS',
    },
    [Font.ROBOTO_SLAB]: {
      font: Font.ROBOTO_SLAB,
      label: 'Aa',
      value: 'ROBOTO_SLAB',
    },
    [Font.SPACE_MONO]: {
      font: Font.SPACE_MONO,
      label: 'Aa',
      value: 'SPACE_MONO',
    },
  };

  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private localStorageService: LocalStorageService
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.initializeFont();
  }

  private initializeFont() {
    const initialFont = this.getInitialFont();
    this.fontDetailsSubject = new BehaviorSubject<Selection>(
      this.fontDetailsMap[initialFont]
    );
    this.fontDetails$ = this.fontDetailsSubject.asObservable();
    this.applyFontToBody(initialFont);
  }

  private getInitialFont(): Font {
    if (this.localStorageService.localStorageExists()) {
      const storageFont = localStorage.getItem('font-family');
      return (storageFont as Font) || Font.KUMBH_SANS;
    } else return Font.KUMBH_SANS;
  }

  selectFont(font: Font) {
    const fontDetails = this.fontDetailsMap[font];
    this.fontDetailsSubject?.next(fontDetails);
    this.applyFontToBody(font);
  }

  save() {
    this.saveFontToStorage(this.fontDetailsSubject?.getValue().font!);
  }

  private applyFontToBody(font: Font) {
    if (this.documentExists())
      this.renderer.setStyle(document.body, 'font-family', font);
  }

  private saveFontToStorage(font: Font) {
    if (this.localStorageService.localStorageExists())
      localStorage.setItem('font-family', font);
  }

  private documentExists() {
    return typeof document != 'undefined';
  }
}
