import { inject, Service } from '@angular/core';
import { Supabase } from '../supabase';

@Service()
export class Genre {
  private _tableName = 'genres';
  private _db = inject(Supabase);

  async getList(): Promise<any[]> {
    const { data } = await this._db.client.from(this._tableName).select('*');

    return data ?? [];
  }
}
