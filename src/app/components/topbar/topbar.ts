import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Supabase } from '@app/services';

@Component({
  imports: [CommonModule],
  selector: 'app-topbar',
  styleUrl: './topbar.scss',
  templateUrl: './topbar.html',
})
export class Topbar {
  private _supabaseService = inject(Supabase);

  currentUser = signal<any>(null);

  currentDate = new Date();

  async ngOnInit() {
    const user = await this._supabaseService.getUser();

    this.currentUser.set(user);
  }
}
