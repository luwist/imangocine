import { inject, Service } from '@angular/core';
import { Supabase } from '../supabase';

@Service()
export class Showtime {
  private _tableName = 'showtimes';
  private _db = inject(Supabase);

  async getList(): Promise<any[]> {
    const { data, error } = await this._db.client
      .from(this._tableName)
      .select(
        `
        *,
        movie:movies(*),
        room:rooms(*)
      `,
      )
      .order('starts_at', { ascending: true });

    if (error) throw error;

    return data ?? [];
  }

  async getListByMovieId(movieId: string): Promise<any[]> {
    const { data, error } = await this._db.client
      .from(this._tableName)
      .select(
        `
        *,
        movie:movies(*),
        room:rooms(*)
      `,
      )
      .eq('movie_id', movieId);

    if (error) throw error;

    return data ?? [];
  }

  async getUpcomingByMovieId(movieId: string): Promise<any[]> {
    const { data, error } = await this._db.client
      .from(this._tableName)
      .select(
        `
        id,
        starts_at,
        format,
        language,
        price,
        room:rooms ( id, name )
      `,
      )
      .eq('movie_id', movieId)
      .eq('is_active', true);

    if (error) throw error;

    return data ?? [];
  }
}
