import { inject, Service } from '@angular/core';
import { Supabase } from '../supabase';
import { User } from '../user/user';
import { Storage } from '../storage';
import { EUserRole } from '@app/enums';
import { parseDate } from '@app/utils';

@Service()
export class AuthService {
  private _supabaseService = inject(Supabase);
  private _storageService = inject(Storage);
  private _userService = inject(User);

  async register(request: any, role: EUserRole) {
    const avatar = await this._storageService.uploadImage(request.avatar);

    const { data, error } = await this._supabaseService.client.auth.signUp({
      email: request.email,
      password: request.password,
      options: {
        data: {
          role: role,
          avatar: avatar,
        },
      },
    });

    await this._userService.add({
      id: data.user?.id,
      first_name: request.firstName,
      last_name: request.lastName,
      email: request.email,
      avatar: request.avatar,
      birth_date: parseDate(request.birthDate),
      blood_type: request.bloodType,
      vacation_days: request.vacationDays,
      role: role,
      eye_color_id: request.eyeColor.id,
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
