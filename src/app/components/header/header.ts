import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Supabase } from '@app/services';
import { ButtonModule } from '@openng/optimus-ui/button';
import { AvatarModule } from '@openng/optimus-ui/avatar';
import { User } from '@supabase/supabase-js';
import { Auth } from '../auth';

@Component({
  imports: [RouterLink, ButtonModule, AvatarModule, Auth],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  currentUser = signal<User | null>(null);

  private _supabaseService = inject(Supabase);

  async ngOnInit() {
    const user = await this._supabaseService.getUser();

    this.currentUser.set(user);
  }
}
