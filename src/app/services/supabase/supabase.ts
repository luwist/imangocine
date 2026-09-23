import { Service } from '@angular/core';
import { environment } from '@environments/environment';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';

@Service()
export class Supabase {
  private _supabaseClient: SupabaseClient;

  get client() {
    return this._supabaseClient;
  }

  constructor() {
    this._supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabasePublishableKey,
    );
  }

  async getUser(): Promise<User | null> {
    const { data, error } = await this._supabaseClient.auth.getUser();

    if (error) {
      return null;
    }

    return data.user;
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this._supabaseClient.auth.onAuthStateChange(callback);
  }

  public getProfile(): PromiseLike<any> {
    const user: any = this.getUser();

    return this._supabaseClient
      .from('profiles')
      .select('username, website, avatar_url')
      .eq('id', user.id)
      .single();
  }

  signIn(email: string) {
    return this._supabaseClient.auth.signInWithOtp({ email });
  }

  signOut() {
    return this._supabaseClient.auth.signOut();
  }

  updateProfile(profile: any) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };
    return this._supabaseClient.from('profiles').upsert(update);
  }

  uploadAvatar(filePath: string, file: File) {
    return this._supabaseClient.storage.from('images').upload(filePath, file);
  }

  getAvatarUrl(filePath: string) {
    return this._supabaseClient.storage.from('images').getPublicUrl(filePath);
  }
}
