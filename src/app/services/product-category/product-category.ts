import { inject, Service } from '@angular/core';
import { Supabase } from '../supabase';

@Service()
export class ProductCategory {
  private _tableName = 'product_categories';
  private _db = inject(Supabase);

  async getList() {
    const { data } = await this._db.client.from(this._tableName).select('*');

    return data ?? [];
  }
}
