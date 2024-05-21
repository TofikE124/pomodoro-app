import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'selection',
  standalone: true,
  imports: [NgClass],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss',
})
export class SelectionComponent {
  @Input('content') content?: string;
  @Input('selected') selected?: boolean = false;

  @Output('select') select: EventEmitter<string> = new EventEmitter();
}
