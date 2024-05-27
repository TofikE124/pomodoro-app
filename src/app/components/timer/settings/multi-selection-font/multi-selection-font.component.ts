import { Observable } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Font, FontService } from '../../../../services/font.service';
import {
  Selection,
  SelectionComponent,
} from '../../../multi-selection/selection/selection.component';

@Component({
  selector: 'multi-selection-font',
  standalone: true,
  imports: [SelectionComponent, NgFor, NgIf, CommonModule],
  templateUrl: './multi-selection-font.component.html',
  styleUrl: './multi-selection-font.component.scss',
})
export class MultiSelectionFontComponent {
  constructor(private fontService: FontService) {}

  // Fonts
  avilableFonts: Selection[] = [];
  selectedFontDetails$?: Observable<Selection>;

  ngOnInit(): void {
    this.avilableFonts = Object.values(this.fontService.fontDetailsMap);
    this.selectedFontDetails$ = this.fontService.fontDetails$;
  }

  fontSelect(font: Font) {
    this.fontService.selectFont(font);
  }
}
