import { Component, ContentChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'primary-button',
  standalone: true,
  imports: [],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss',
})
export class PrimaryButtonComponent {
  @Input('content') content!: string;
}
