import { Component, input, output } from '@angular/core';
import { Seat } from '../seat/seat';

@Component({
  imports: [Seat],
  selector: 'app-seat-map',
  styleUrl: './seat-map.scss',
  templateUrl: './seat-map.html',
})
export class SeatMap {
  readonly rows = input.required<any[]>();

  readonly seatToggle = output<any>();
}
