import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteToHours',
})
export class MinuteToHoursPipe implements PipeTransform {
  transform(value: number | string): string {
    const totalMinutes = typeof value === 'string' ? parseInt(value, 10) : value;

    if (isNaN(totalMinutes) || totalMinutes < 0) {
      return '0 min';
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) {
      return `${minutes}m`;
    }

    if (minutes === 0) {
      return `${hours}h`;
    }

    const formattedMinutes = minutes < 10 ? `${minutes}` : minutes;

    return `${hours}h ${formattedMinutes}m`;
  }
}
