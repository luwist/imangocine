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
}
