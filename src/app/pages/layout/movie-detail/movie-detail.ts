import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkeletonModule } from '@openng/optimus-ui/skeleton';
import { ButtonModule } from '@openng/optimus-ui/button';
import { CommonModule, DatePipe } from '@angular/common';
import { Movie, Review } from '@app/services';
import { MinuteToHoursPipe } from '@app/pipes';

@Component({
  imports: [CommonModule, SkeletonModule, ButtonModule, DatePipe, MinuteToHoursPipe],
  selector: 'app-movie-detail',
  styleUrl: './movie-detail.scss',
  templateUrl: './movie-detail.html',
})
export class MovieDetail implements OnInit {
  movie = signal<any | null>(null);
  reviews = signal<any[]>([]);
  loading = signal<boolean>(true);
  isExpanded = signal(false);

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _movieService = inject(Movie);
  private _reviewService = inject(Review);

  async ngOnInit() {
    const slug = this._route.snapshot.paramMap.get('slug')!;

    const movie = await this._movieService.getBySlug(slug);
    const reviews = await this._reviewService.getListByMovieId(movie.id);

    console.log(movie);
    console.log(reviews);

    this.movie.set(movie);
    this.reviews.set(reviews);
    this.loading.set(false);
  }

  starsFor(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }

  toggleSynopsis() {
    this.isExpanded.update((value) => !value);
  }

  async onBuyTicket() {
    await this._router.navigate(['checkout', 'showtime'], {
      queryParams: { movie: this.movie().id },
    });
  }
}
