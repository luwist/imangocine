import { inject, Service } from '@angular/core';
import { Supabase } from '../supabase';

@Service()
export class Review {
  private _tableName = 'reviews';
  private _db = inject(Supabase);

  async getListByMovieId(movieId: string): Promise<any[]> {
    const { data } = await this._db.client
      .from(this._tableName)
      .select('*, users(*)')
      .eq('movie_id', movieId);

    return data ?? [];
  }
}
