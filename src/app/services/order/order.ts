import { inject, Service } from '@angular/core';
import { Supabase } from '../supabase';

@Service()
export class Order {
  private _tableName = 'orders';
  private _db = inject(Supabase);

  async add(table: any): Promise<any> {
    const { data, error } = await this._db.client
      .from(this._tableName)
      .insert(table)
      .select()
      .single();

    if (error) throw new Error(`Failed to create order: ${error.message}`);

    return data;
  }

  async getById(id: string) {
    const { data } = await this._db.client
      .from(this._tableName)
      .select(
        `
        *,
        showtimes(
          *, 
          rooms(*), 
          movies(*)
        ),
        tickets(*)
      `,
      )
      .eq('id', id)
      .single();

    return data ?? null;
  }
}
