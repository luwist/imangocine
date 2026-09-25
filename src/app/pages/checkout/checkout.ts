import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Topbar } from './topbar/topbar';
import { Summary } from './summary/summary';
import { CheckoutSummary, Movie } from '@app/services';

@Component({
  imports: [RouterOutlet, Topbar, Summary],
  selector: 'app-checkout',
  styleUrl: './checkout.scss',
  templateUrl: './checkout.html',
})
export class Checkout {
  private _movieService = inject(Movie);
  private _checkoutSummaryService = inject(CheckoutSummary);
  private _route = inject(ActivatedRoute);

  async ngOnInit() {
    const movieId = this._route.snapshot.queryParamMap.get('movie')!;

    const movie = await this._movieService.getById(movieId);

    this._checkoutSummaryService.setMovie(movie);
  }
}
