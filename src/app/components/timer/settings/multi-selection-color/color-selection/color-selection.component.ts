import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconType } from '../../../../../constants/icons';
import { ColorDetails } from '../../../../../services/color.service';
import { SmallIconComponent } from '../../../../small-icon/small-icon.component';

@Component({
  selector: 'color-selection',
  standalone: true,
  imports: [NgIf, NgStyle, SmallIconComponent],
  templateUrl: './color-selection.component.html',
  styleUrl: './color-selection.component.scss',
})
export class ColorSelectionComponent {
  @Input('colorDetails') colorDetails?: ColorDetails;
  @Input('width') width?: number;
  @Input('height') height?: number;
  @Input('selected') selected?: boolean;

  @Output('select') select: EventEmitter<ColorDetails> = new EventEmitter();

  checkIcon = IconType.CHECK;
}
