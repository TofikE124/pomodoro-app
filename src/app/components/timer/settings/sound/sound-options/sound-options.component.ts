import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownOption } from '../../../../dropdown/dropdown-option/dropdown-option.component';
import { DropdownComponent } from '../../../../dropdown/dropdown.component';
import { SliderComponent } from '../../../../slider/slider.component';

@Component({
  selector: 'sound-options',
  standalone: true,
  imports: [DropdownComponent, SliderComponent, CommonModule],
  templateUrl: './sound-options.component.html',
  styleUrl: './sound-options.component.scss',
})
export class SoundOptionsComponent {
  @Input('label') label?: string;
  @Input('options') options: DropdownOption[] = [];
  @Input('volume') volume!: number;
  @Input('value') value!: string | number | null;

  @Output('dropDownValueChange') dropDownValueChange: EventEmitter<
    string | number | null
  > = new EventEmitter<string | number | null>();
  @Output('volumeChange') volumeChange: EventEmitter<number> =
    new EventEmitter();

  onDropDownValueChange(value: string | number | null) {
    this.dropDownValueChange.emit(value);
  }

  volumeValueChange(value: number) {
    this.volumeChange.emit(value);
  }
}
