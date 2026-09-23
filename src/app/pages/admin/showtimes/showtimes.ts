import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Showtime } from '@app/services';
import { ButtonModule } from '@openng/optimus-ui/button';
import { SkeletonModule } from '@openng/optimus-ui/skeleton';
import { TableModule } from '@openng/optimus-ui/table';

@Component({
  imports: [CommonModule, ButtonModule, TableModule, SkeletonModule],
  selector: 'app-showtimes',
  styleUrl: './showtimes.scss',
  templateUrl: './showtimes.html',
})
export class Showtimes {
  private _showtimeService = inject(Showtime);

  showtimes = signal<any[]>([]);
  loading = signal(true);
  skeletonRows = [1, 2, 3, 4, 5, 6];

  async ngOnInit() {
    try {
      this.showtimes.set(await this._showtimeService.getList());

      console.log(this.showtimes());
    } finally {
      this.loading.set(false);
    }
  }
}
