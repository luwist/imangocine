import { inject, Service } from '@angular/core';
import { Supabase } from '../supabase';

@Service()
export class Storage {
  private _supabaseService = inject(Supabase);

  async uploadImage(file: File): Promise<string> {
    const ext = file.name.split('.').pop();
    const path = `${crypto.randomUUID()}.${ext}`;

    await this._supabaseService.uploadAvatar(path, file);

    return this._supabaseService.getAvatarUrl(path).data.publicUrl;
  }
}
