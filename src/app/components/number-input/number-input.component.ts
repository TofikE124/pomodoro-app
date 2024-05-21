import { Component, Input, OnInit } from '@angular/core';
import { SmallIconComponent } from '../small-icon/small-icon.component';
import { iconMap, iconType } from '../../constants/icons';

@Component({
  selector: 'number-input',
  standalone: true,
  imports: [SmallIconComponent],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss',
})
export class NumberInputComponent implements OnInit {
  arrowUpIcon = iconMap[iconType.ARROW_UP];
  arrowDownIcon = iconMap[iconType.ARROW_DOWN];

  @Input('defaultValue') defaultValue?: number;
  @Input('min') min?: number;
  @Input('max') max?: number;
  value = 0;

  ngOnInit(): void {
    if (this.defaultValue) this.value = this.defaultValue;
  }

  increment = () => {
    this.value++;
    this.checkRange();
  };

  decrement = () => {
    this.value--;
    this.checkRange();
  };

  checkRange() {
    if (this.max && this.value > this.max) this.value = this.max;
    if (this.min && this.value < this.min) this.value = this.min;
  }
}
