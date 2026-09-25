import { inject, Service } from '@angular/core';
import { Supabase } from '../supabase';

@Service()
export class User {
  private _tableName = 'users';
  private _db = inject(Supabase);

  async add(request: any): Promise<any> {
    const { data, error } = await this._db.client
      .from(this._tableName)
      .insert(request)
      .select()
      .single();

    if (error) throw new Error(`Failed to create movie: ${error.message}`);

    return data;
  }
}
