import { Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '@app/components';
import { Movie } from '@app/services';
import { BreadcrumbModule } from '@openng/optimus-ui/breadcrumb';
import { ButtonModule } from '@openng/optimus-ui/button';

@Component({
  imports: [BreadcrumbModule, ButtonModule, Auth],
  selector: 'app-topbar',
  styleUrl: './topbar.scss',
  templateUrl: './topbar.html',
})
export class Topbar {
  private _router = inject(Router);
  private _location = inject(Location);
  private _movieService = inject(Movie);
  private _route = inject(ActivatedRoute);

  movie = signal<any | null>(null);
  items = signal<any[] | undefined>(undefined);

  async ngOnInit() {
    this.items.set([
      { label: 'Horarios' },
      { label: 'Asientos' },
      { label: 'Comida' },
      { label: 'Pago' },
    ]);

    const id = this._route.snapshot.queryParamMap.get('movie');

    const movie = await this._movieService.getById(id!);

    this.movie.set(movie);
  }

  async goBack() {
    this._location.back();
  }
}
