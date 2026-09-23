import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MinuteToHoursPipe } from '@app/pipes';
import { Movie } from '@app/services';
import { ButtonModule } from '@openng/optimus-ui/button';
import { TableModule } from '@openng/optimus-ui/table';
import { SkeletonModule } from '@openng/optimus-ui/skeleton';

@Component({
  imports: [CommonModule, RouterLink, ButtonModule, TableModule, MinuteToHoursPipe, SkeletonModule],
  selector: 'app-movies',
  styleUrl: './movies.scss',
  templateUrl: './movies.html',
})
export class Movies implements OnInit {
  private _movieServices = inject(Movie);

  movies = signal<any[]>([]);
  loading = signal(true);
  skeletonRows = [1, 2, 3, 4, 5, 6];

  async ngOnInit() {
    try {
      this.movies.set(await this._movieServices.getList());
    } finally {
      this.loading.set(false);
    }
  }
}
