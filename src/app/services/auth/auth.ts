import { inject, Service } from '@angular/core';
import { Supabase } from '../supabase';

@Service()
export class Auth {
  private _supabaseService = inject(Supabase);

  async register(request: any, role: any) {
    const { data, error } = await this._supabaseService.client.auth.signUp({
      email: request.email,
      password: request.email,
      options: {
        data: {
          role: role,
          avatar: request.avatar,
        },
      },
    });

    if (error) throw new Error(`Registration failed: ${error.message}`);
    if (!data.user) throw new Error('Registration failed: no user returned');

    return data;
  }

  async login(request: any) {
    const { data, error } = await this._supabaseService.client.auth.signInWithPassword({
      email: request.email,
      password: request.password,
    });

    if (error) throw new Error(`Login failed: ${error.message}`);
    if (!data.user) throw new Error('Login failed: no user returned');

    return data;
  }

  async logout(): Promise<void> {
    const { error } = await this._supabaseService.client.auth.signOut();

    if (error) throw new Error(`Logout failed: ${error.message}`);
  }
}
