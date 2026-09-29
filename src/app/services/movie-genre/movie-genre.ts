import { inject, Service } from '@angular/core';
import { Supabase } from '../supabase';

@Service()
export class MovieGenre {
  private _tableName = 'movie_genres';
  private _db = inject(Supabase);

  async add(table: any): Promise<any> {
    const { data, error } = await this._db.client.from(this._tableName).insert(table).select();

    if (error) throw new Error(`Failed to create movie-genres: ${error.message}`);

    return data;
  }
}
