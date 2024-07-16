import { Input, Pipe, PipeTransform } from '@angular/core';
import { format } from 'path';
import { formatTime } from '../lib/utils';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  transform(value?: number | null): string {
    return formatTime(value);
  }
}
