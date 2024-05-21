import { NgClass, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { icon } from '../../constants/icons';

@Component({
  selector: 'small-icon',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './small-icon.component.html',
  styleUrl: './small-icon.component.scss',
})
export class SmallIconComponent implements OnInit {
  @Input('icon') icon!: icon;
  @Input('width') width: number = 20;
  @Input('height') height: number = 20;
  @Input('color') color?: string;
  @Input('hoverColor') hoverColor?: string;
  @Input('opacity') opacity?: number = 1;
  @Input('hoverOpacity') hoverOpacity?: number = 1;
  @Input('disabled') disabled: boolean = false;

  backgroundColor: string = '';

  getStyle() {
    return {
      maskImage: `url(${this.icon.URL})`,
      backgroundColor: this.backgroundColor,
      width: this.width + 'px',
      height: this.height + 'px',
      opacity: this.opacity,
      '--hover-color': this.hoverColor ?? this.backgroundColor,
      '--hover-opacity': this.hoverOpacity ?? this.opacity,
    };
  }

  ngOnInit(): void {
    this.backgroundColor = this.color == '' ? '' : this.color ?? '#fff';
  }
}
