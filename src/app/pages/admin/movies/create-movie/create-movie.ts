import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from '@openng/optimus-ui/button';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TextareaModule } from '@openng/optimus-ui/textarea';
import { SelectButtonModule } from '@openng/optimus-ui/selectbutton';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PosterUpload } from '@app/components';
import { Genre, Movie, MovieGenre, Storage } from '@app/services';
import { InputMaskModule } from '@openng/optimus-ui/inputmask';
import { parseDate } from '@app/utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectButtonModule,
    PosterUpload,
    InputMaskModule,
  ],
  selector: 'app-create-movie',
  styleUrl: './create-movie.scss',
  templateUrl: './create-movie.html',
})
export class CreateMovie implements OnInit {
  private _router = inject(Router);

  private _genreService = inject(Genre);

  private _movieRepository = inject(Movie);
  private _movieGenreRepository = inject(MovieGenre);

  private _storageService = inject(Storage);

  readonly ageRatingOptions = [
    { label: 'ATP', value: 0 },
    { label: '+13', value: 13 },
    { label: '+18', value: 18 },
  ];

  genres = signal<any[]>([]);

  form = new FormGroup({
    poster: new FormControl(null, Validators.required),
    title: new FormControl('', Validators.required),
    synopsis: new FormControl('', Validators.required),
    duration: new FormControl(null, Validators.required),
    released: new FormControl(null, Validators.required),
    ageRating: new FormControl(0, Validators.required),
    genres: new FormControl<string[]>([], {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  async ngOnInit() {
    const genres = await this._genreService.getList();

    this.genres.set(genres);
  }

  isGenreSelected(id: string) {
    return this.form.controls.genres.value.includes(id);
  }

  toggleGenre(id: string) {
    const control = this.form.controls.genres;
    const current = control.value;

    control.setValue(
      current.includes(id) ? current.filter((genreId) => genreId !== id) : [...current, id],
    );

    control.markAsTouched();
  }

  getFormControl(controlName: string) {
    return this.form.get(controlName);
  }

  onPosterSelected(file: any) {
    this.form.patchValue({
      poster: file,
    });
  }

  private _createSlug(slug: string | null) {
    if (!slug) return;

    return slug
      .toLowerCase()
      .replace(/ñ/g, 'n')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async onCreate() {
    try {
      console.log('qwewqe');
      console.log(this.form.invalid);

      if (this.form.invalid) return this.form.markAllAsTouched();

      const data: any = this.form.getRawValue();

      const poster = await this._storageService.uploadImage(data.poster);

      console.log(poster);

      const movie = await this._movieRepository.add({
        title: data.title,
        synopsis: data.synopsis,
        poster: poster,
        duration: data.duration,
        age_restriction: data.ageRating,
        released: parseDate(data.released),
        slug: this._createSlug(data.title),
      });

      console.log(movie);

      const genresMovie = data.genres.map((x: any) => {
        return {
          movie_id: movie.id,
          genre_id: x,
        };
      });

      await this._movieGenreRepository.add(genresMovie);

      console.log(data);
      console.log(genresMovie);
      await this._router.navigate(['admin', 'movies']);
    } catch (error) {}
  }
}
