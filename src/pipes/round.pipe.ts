import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
  standalone: true,
})
export class RoundPipe implements PipeTransform {
  transform(value: string | number | null): string | number {
    if (typeof value === 'number') {
      return Math.round(value * 100) / 100;
    } else {
      return value ?? '-';
    }
  }
}
