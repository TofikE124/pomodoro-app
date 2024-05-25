import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Selection } from '../components/multi-selection/selection/selection.component';

export enum Font {
  KUMBH_SANS = 'Kumbh Sans',
  ROBOTO_SLAB = 'Roboto Slab',
  SPACE_MONO = 'Space Mono',
}

@Injectable({
  providedIn: 'root',
})
export class FontService {
  private fontDetailsSubject: BehaviorSubject<Selection>;
  fontDetails$: Observable<Selection>;

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

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const initialFont = this.getInitialFont();
    this.fontDetailsSubject = new BehaviorSubject<Selection>(
      this.fontDetailsMap[initialFont]
    );
    this.fontDetails$ = this.fontDetailsSubject.asObservable();
    this.applyFontToBody(initialFont);
  }

  private getInitialFont(): Font {
    if (this.localStorageExists()) {
      const storageFont = localStorage.getItem('font-family');
      return (storageFont as Font) || Font.KUMBH_SANS;
    } else {
      return Font.KUMBH_SANS;
    }
  }

  selectFont(font: Font) {
    const fontDetails = this.fontDetailsMap[font];
    this.fontDetailsSubject.next(fontDetails);
    this.applyFontToBody(font);
  }

  save() {
    this.saveFontToStorage(this.fontDetailsSubject.getValue().font!);
  }

  private applyFontToBody(font: Font) {
    if (this.documentExists())
      this.renderer.setStyle(document.body, 'font-family', font);
  }

  private saveFontToStorage(font: Font) {
    if (this.localStorageExists()) localStorage.setItem('font-family', font);
  }

  private localStorageExists() {
    return typeof localStorage != 'undefined';
  }

  private documentExists() {
    return typeof document != 'undefined';
  }
}
