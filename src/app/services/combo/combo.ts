import { inject, Service } from '@angular/core';
import { Supabase } from '../supabase/supabase';

@Service()
export class Combo {
  private _tableName = 'combos';
  private _db = inject(Supabase);

  async getListWithItems(): Promise<any[]> {
    const { data } = await this._db.client.from(this._tableName).select('*, combo_categories(*)');

    return data ?? [];
  }
}
