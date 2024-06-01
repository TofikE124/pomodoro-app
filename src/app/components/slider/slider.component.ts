import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'slider',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  @Input('min') min: number = 0;
  @Input('max') max: number = 100;
  @Input('value') value?: number;

  @Output('valueChange') valueChange: EventEmitter<number> = new EventEmitter();

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(parseInt(target.value));
  }
}
