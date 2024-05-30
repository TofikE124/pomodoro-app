import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorSelectionComponent } from './color-selection/color-selection.component';
import { ColorDetails } from '../../../../constants/colors';
import { ColorService } from '../../../../services/color.service';

@Component({
  selector: 'multi-selection-color',
  standalone: true,
  imports: [ColorSelectionComponent, NgFor, NgIf, CommonModule],
  templateUrl: './multi-selection-color.component.html',
  styleUrl: './multi-selection-color.component.scss',
})
export class MultiSelectionColorComponent implements OnInit {
  colors: ColorDetails[] = [];
  selectedColorDetails$?: Observable<ColorDetails>;

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.colors = Object.values(this.colorService.colors);
    this.selectedColorDetails$ = this.colorService.selectedColorDetails$;
  }

  selectColor(ColorDetails: ColorDetails) {
    this.colorService.selectColor(ColorDetails);
  }
}
