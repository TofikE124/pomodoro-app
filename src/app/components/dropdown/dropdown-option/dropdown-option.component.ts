import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

export interface DropdownOption {
  label: string;
  value: string | number | null;
}

@Component({
  selector: 'dropdown-option',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dropdown-option.component.html',
  styleUrl: './dropdown-option.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DropdownOptionComponent {
  @Input('value') value: string | number | null = null;
  @Input('active') active: boolean = false;

  @Output('optionClicked')
  optionClicked: EventEmitter<DropdownOptionComponent> = new EventEmitter();

  onOptionClick() {
    this.optionClicked.emit(this);
  }
}
