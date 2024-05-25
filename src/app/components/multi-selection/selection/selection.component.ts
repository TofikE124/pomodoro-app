import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Font } from '../../../services/font.service';

export interface Selection {
  value: string;
  label: string;
  font?: Font;
}

@Component({
  selector: 'selection',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss',
})
export class SelectionComponent {
  @Input('selection') selection?: Selection;
  @Input('selected') selected?: boolean = false;

  @Output('select') select: EventEmitter<Selection> = new EventEmitter();
}
