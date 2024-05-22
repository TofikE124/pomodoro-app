import { Component, Input } from '@angular/core';

@Component({
  selector: 'circular-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './circular-progress-bar.component.html',
  styleUrl: './circular-progress-bar.component.scss',
})
export class CircularProgressBarComponent {
  @Input('width') width!: number;
  @Input('height') height!: number;
  @Input('stroke-width') strokeWidth!: number;
  @Input('stroke-color') strokeColor!: string;
  @Input('progress') progress!: number; // Progress value from 0 to 100

  get radius() {
    return (Math.min(this.width, this.height) - this.strokeWidth) / 2;
  }

  get circumference() {
    return 2 * Math.PI * this.radius;
  }

  get centerX() {
    return this.width / 2;
  }

  get centerY() {
    return this.height / 2;
  }

  get progressOffset() {
    const progressValue = Math.max(0, Math.min(100, this.progress)); // Ensure progress is between 0 and 100
    return this.circumference * (1 - progressValue / 100);
  }
}
