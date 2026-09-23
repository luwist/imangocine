import { Component, signal, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Room } from '@app/services';
import { MessageService } from '@openng/optimus-ui/api';
import { ButtonModule } from '@openng/optimus-ui/button';
import { ToastModule } from '@openng/optimus-ui/toast';

@Component({
  imports: [ButtonModule, ToastModule],
  selector: 'app-seats-step',
  styleUrl: './seats-step.scss',
  templateUrl: './seats-step.html',
  providers: [MessageService],
})
export class SeatsStep {
  readonly maxSeats = 5;

  private static readonly NORMAL_BLOCK_SIZES = [4, 20, 4];
  private static readonly ACCESSIBLE_BLOCK_SIZES = [2, 10, 2];

  private static readonly ROOM_LAYOUT: any[] = [
    ...['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((row) => ({ row, type: 'standard' })),
    { row: 'J', type: 'accessible' },
    ...['L', 'M', 'N', 'O', 'P', 'Q', 'R'].map((row) => ({ row, type: 'standard' })),
    ...['S', 'T'].map((row) => ({ row, type: 'vip' })),
  ];

  private _messageService = inject(MessageService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _roomService = inject(Room);

  private _occupiedSeats = signal<string[]>([]);

  selectedSeats = signal<string[]>([]);

  rows = signal<any[]>([]);
  limitReached = signal(false);

  async ngOnInit() {
    const movieId = this._route.snapshot.queryParamMap.get('movie')!;
    const showtimeId = this._route.snapshot.queryParamMap.get('showtime')!;

    const rooms = await this._roomService.getListByShowtimeId(showtimeId);

    const occupiedCodes = rooms.map((r) => r.seat_code);

    this._occupiedSeats.set(occupiedCodes);

    this._buildRows();
  }

  toggleSeat(seat: any) {
    if (seat.status === 'occupied') return;

    const current = this.selectedSeats();

    if (current.includes(seat.code)) {
      this.selectedSeats.set(current.filter((code) => code !== seat.code));
      this.limitReached.set(false);

      this._buildRows();

      return;
    }

    if (current.length >= this.maxSeats) {
      this.limitReached.set(true);
      this._messageService.add({ detail: 'Llegaste al máximo de 5 butacas permitidas' });

      return;
    }

    this.selectedSeats.set([...current, seat.code]);
    this._buildRows();
  }

  goToFood() {
    this._router.navigate(['/checkout/food'], { queryParamsHandling: 'preserve' });
  }

  private _buildRows() {
    const occupied = this._occupiedSeats();
    const selected = this.selectedSeats();

    const rows = SeatsStep.ROOM_LAYOUT.map(({ row, type }) =>
      this._buildRow(row, type, occupied, selected),
    );
    this.rows.set(rows);
  }

  private _buildRow(row: string, type: any, occupied: string[], selected: string[]) {
    const blockSizes =
      type === 'accessible' ? SeatsStep.ACCESSIBLE_BLOCK_SIZES : SeatsStep.NORMAL_BLOCK_SIZES;
    let seatNumber = 1;

    const blocks: any[][] = [];

    for (const size of blockSizes) {
      const seats: any[] = [];

      for (let i = 0; i < size; i++) {
        const code = `${row}${seatNumber}`;

        seats.push({
          code,
          type,
          status: this._getSeatStatus(code, occupied, selected),
        });

        seatNumber++;
      }

      blocks.push(seats);
    }

    return { row, type, blocks };
  }

  private _getSeatStatus(code: string, occupied: string[], selected: string[]) {
    if (occupied.includes(code)) return 'occupied';
    if (selected.includes(code)) return 'selected';

    return 'available';
  }
}
