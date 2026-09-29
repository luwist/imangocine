import { Component, inject, signal } from '@angular/core';
import { MessageService } from '@openng/optimus-ui/api';
import { ToastModule } from '@openng/optimus-ui/toast';
import { SeatMap } from './seat-map/seat-map';
import { SeatLegend } from './seat-legend/seat-legend';
import { ActivatedRoute } from '@angular/router';
import { CheckoutSummary, Room, SessionId, Supabase } from '@app/services';
import { buildSeatRows } from './seat-layout';

@Component({
  imports: [ToastModule, SeatMap, SeatLegend],
  selector: 'app-seat-step',
  styleUrl: './seat-step.scss',
  templateUrl: './seat-step.html',
  providers: [MessageService],
})
export class SeatStep {
  readonly maxSeats = 5;

  private readonly _messageService = inject(MessageService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _supabase = inject(Supabase);
  private readonly _seatHolds = inject(Room);
  private readonly _checkoutSummary = inject(CheckoutSummary);
  private readonly _sessionIdService = inject(SessionId);

  private _showtimeId!: string;
  private _sessionId!: string;
  private _occupiedSeats: string[] = [];
  private _pricing: any = { standard: 0, vip: 0, accessible: 0 };

  readonly selectedSeats = signal<any[]>([]);
  readonly rows = signal<any[]>([]);
  readonly limitReached = signal(false);

  async ngOnInit(): Promise<void> {
    this._showtimeId = this._route.snapshot.queryParamMap.get('showtime')!;

    const userId = await this._sessionIdService.get();

    this._checkoutSummary.setUserId(userId);

    this._sessionId = userId;

    console.log('EL TOKEN DEL USUARIO ANONIMO O AUTENTICADO');
    console.log(this._sessionId);

    const occupiedSeats = await this._seatHolds.getListByShowtimeId(this._showtimeId);
    const pricing = await this._seatHolds.getSeatTypePricing();

    this._occupiedSeats = occupiedSeats.map((s) => s.seat_code);
    this._pricing = pricing;

    this._render();
  }

  async onSeatToggle(seat: any): Promise<void> {
    if (seat.status === 'occupied') return;

    const isSelected = this.selectedSeats().some((s) => s.code === seat.code);

    if (isSelected) {
      await this._deselectSeat(seat);

      return;
    }

    if (this.selectedSeats().length >= this.maxSeats) {
      this.limitReached.set(true);

      this._messageService.add({
        detail: 'Llegaste al máximo de 5 butacas permitidas',
      });

      return;
    }

    await this._selectSeat(seat);
  }

  private async _selectSeat(seat: any): Promise<void> {
    await this._seatHolds.hold(this._showtimeId, seat.code, this._sessionId);

    const price = this._pricing[seat.type] ?? 0;

    this.selectedSeats.update((seats) => [
      ...seats,
      { code: seat.code, type: seat.type, status: 'selected', price },
    ]);

    this.limitReached.set(false);

    this._checkoutSummary.setSeats(this.selectedSeats());

    this._render();
  }

  private async _deselectSeat(seat: any): Promise<void> {
    await this._seatHolds.release(this._showtimeId, seat.code, this._sessionId);
    this.selectedSeats.update((seats: any) => seats.filter((s: any) => s.code !== seat.code));

    this._checkoutSummary.setSeats(this.selectedSeats());

    this._render();
  }

  private _render(): void {
    const selectedCodes = this.selectedSeats().map((s) => s.code);

    this.rows.set(buildSeatRows(this._occupiedSeats, selectedCodes));
  }
}
