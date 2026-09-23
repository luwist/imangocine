import { inject, Service } from '@angular/core';
import { Supabase } from '../supabase/supabase';

@Service()
export class Movie {
  private _tableName = 'movies';
  private _db = inject(Supabase);

  async getList(): Promise<any[]> {
    const { data } = await this._db.client
      .from(this._tableName)
      .select('*, genres(id, name)')
      .order('released', { ascending: false });

    return data ?? [];
  }

  async getBySlug(slug: string) {
    const { data } = await this._db.client
      .from(this._tableName)
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    return data ?? null;
  }

  async getTopSelling(limit = 3): Promise<any[]> {
    const today = new Date().toISOString().slice(0, 10);

    const { data, error } = await this._db.client
      .from(this._tableName)
      .select('slug, title, synopsis, poster, age_restriction')
      .eq('is_active', true)
      .order('released', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);

    return data ?? [];
  }

  async getById(id: string) {
    const { data } = await this._db.client
      .from(this._tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    return data ?? null;
  }

  async add(table: any): Promise<any> {
    const { data, error } = await this._db.client
      .from(this._tableName)
      .insert(table)
      .select()
      .single();

    if (error) throw new Error(`Failed to create movie: ${error.message}`);

    return data;
  }
}
