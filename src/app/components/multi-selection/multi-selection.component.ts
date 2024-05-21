import { Component, Input, OnInit } from '@angular/core';
import { SelectionComponent } from './selection/selection.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'multi-selection',
  standalone: true,
  imports: [SelectionComponent, NgFor],
  templateUrl: './multi-selection.component.html',
  styleUrl: './multi-selection.component.scss',
})
export class MultiSelectionComponent implements OnInit {
  @Input('selections') selections: string[] = [];
  @Input('defaultSelection') defaultSelection?: string;

  value: string = '';

  selectionClick = (selection: string) => {
    console.log(selection);
    this.value = selection;
  };

  ngOnInit(): void {
    this.value = this.defaultSelection || '';
  }
}
