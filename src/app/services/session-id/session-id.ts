import { inject, Service } from '@angular/core';
import { Supabase } from '../supabase';

const GUEST_SESSION_KEY = 'checkout_guest_session_id';

@Service()
export class SessionId {
  private _db = inject(Supabase);
  private _cachedId: string | null = null;

  async get() {
    if (this._cachedId) return this._cachedId;

    const {
      data: { user },
    } = await this._db.client.auth.getUser();

    this._cachedId = user ? user.id : await this._getOrCreateGuestId();

    return this._cachedId;
  }

  private async _getOrCreateGuestId() {
    const existing = sessionStorage.getItem(GUEST_SESSION_KEY);

    if (existing) return existing;

    const anonUser = await this._db.client.auth.signInAnonymously();

    const anonId = anonUser.data.user?.id!;

    sessionStorage.setItem(GUEST_SESSION_KEY, anonId);

    return anonId;
  }
}
