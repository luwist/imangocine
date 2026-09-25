import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '@app/services';
import { SkeletonModule } from '@openng/optimus-ui/skeleton';
import { Hero } from '../hero/hero';
import { MinuteToHoursPipe } from '@app/pipes';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, RouterLink, SkeletonModule, Hero, MinuteToHoursPipe],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  topMovies = signal<any[]>([]);
  movies = signal<any[]>([]);
  loading = signal<boolean>(true);

  readonly skeletonItems = Array.from({ length: 12 });

  private _movieService = inject(Movie);
  private _destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      document.body.classList.toggle('is-locked', this.loading());
    });

    this._destroyRef.onDestroy(() => {
      document.body.classList.remove('is-locked');
    });
  }

  async ngOnInit() {
    try {
      const movies = await this._movieService.getList();
      const topMovies = await this._movieService.getTopSelling();

      console.log(movies);
      console.log(topMovies);

      this.topMovies.set(topMovies);
      this.movies.set(movies);

      this.loading.set(false);
    } finally {
      this.loading.set(false);
    }
  }
}
