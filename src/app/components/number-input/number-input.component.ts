import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconType } from '../../constants/icons';
import { SmallIconComponent } from '../small-icon/small-icon.component';

@Component({
  selector: 'number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  imports: [SmallIconComponent, FormsModule],
  standalone: true,
})
export class NumberInputComponent {
  arrowUpIcon = IconType.ARROW_UP;
  arrowDownIcon = IconType.ARROW_DOWN;

  @Input() value!: number;
  @Input() min: number = Number.MIN_SAFE_INTEGER;
  @Input() max: number = Number.MAX_SAFE_INTEGER;

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  input?: HTMLInputElement;

  increment() {
    if (this.max === undefined || this.value < this.max) {
      this.value++;
      this.emitChange();
    }
  }

  decrement() {
    if (this.min === undefined || this.value > this.min) {
      this.value--;
      this.emitChange();
    }
  }

  private emitChange() {
    this.valueChange.emit(this.value);
  }

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    let newValue = parseInt(target.value);

    // Check if the new value exceeds the maximum
    if (newValue > this.max) {
      this.value = this.max; // Set the value to the maximum allowed
    } else if (newValue < this.min) {
      this.value = this.min; // Ensure the value doesn't fall below the minimum allowed
    } else {
      this.value = newValue; // Otherwise, set the value to the entered value
    }

    target.value = this.value.toString(); // Update the input field value
    this.valueChange.emit(this.value);
  }
}
