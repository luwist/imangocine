import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-seat',
  styleUrl: './seat.scss',
  templateUrl: './seat.html',
})
export class Seat {
  readonly seat = input.required<any>();

  readonly seatClick = output<any>();

  onClick(): void {
    if (this.seat().status === 'occupied') return;

    this.seatClick.emit(this.seat());
  }
}
