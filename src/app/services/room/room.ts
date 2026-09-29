import { inject, Service } from '@angular/core';
import { Supabase } from '../supabase';

@Service()
export class Room {
  private _tableName = 'seat_holds';
  private _db = inject(Supabase);

  async getListByShowtimeId(showtimeId: string): Promise<any[]> {
    const { data, error } = await this._db.client
      .from(this._tableName)
      .select(
        `
        *
      `,
      )
      .eq('showtime_id', showtimeId);

    if (error) throw error;

    return data ?? [];
  }

  async hold(showtimeId: string, seatCode: string, sessionId: string) {
    const { error } = await this._db.client.from('seat_holds').insert({
      showtime_id: showtimeId,
      seat_code: seatCode,
      session_id: sessionId,
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    });

    if (error) throw error;
  }

  async release(showtimeId: string, seatCode: string, sessionId: string) {
    const { error } = await this._db.client
      .from('seat_holds')
      .delete()
      .eq('showtime_id', showtimeId)
      .eq('seat_code', seatCode)
      .eq('session_id', sessionId);

    if (error) throw error;
  }

  async getSeatTypePricing() {
    const { data, error } = await this._db.client
      .from('seat_type_pricing')
      .select('seat_type, price');

    if (error) throw error;

    return data.reduce((acc, row) => ({ ...acc, [row.seat_type]: row.price }), {});
  }
}
