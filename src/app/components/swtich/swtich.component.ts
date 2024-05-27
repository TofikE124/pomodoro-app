import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'swtich',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './swtich.component.html',
  styleUrl: './swtich.component.scss',
})
export class SwtichComponent {
  @Input('value') value: boolean = false;

  @Output('valueChanges') valueChanges: EventEmitter<boolean> =
    new EventEmitter();

  handleChange(event: boolean) {
    this.valueChanges.emit(event);
  }
}
