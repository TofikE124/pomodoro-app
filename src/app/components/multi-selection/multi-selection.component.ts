import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Selection, SelectionComponent } from './selection/selection.component';

@Component({
  selector: 'multi-selection',
  standalone: true,
  imports: [SelectionComponent, NgFor],
  templateUrl: './multi-selection.component.html',
  styleUrl: './multi-selection.component.scss',
})
export class MultiSelectionComponent implements OnInit {
  @Input('selections') selections: Selection[] = [];
  @Input('defaultSelection') defaultSelection?: Selection;
  @Output('select') select: EventEmitter<Selection> = new EventEmitter();

  value?: Selection;

  selectionClick = (selection: Selection) => {
    this.value = selection;
    this.select.emit(selection);
  };

  ngOnInit(): void {
    this.value = this.defaultSelection;
  }
}
