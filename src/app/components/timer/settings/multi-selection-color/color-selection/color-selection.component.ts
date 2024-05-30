import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconType } from '../../../../../constants/icons';
import { SmallIconComponent } from '../../../../small-icon/small-icon.component';
import { ColorDetails } from '../../../../../constants/colors';

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
