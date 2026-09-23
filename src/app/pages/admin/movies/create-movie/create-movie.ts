import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from '@openng/optimus-ui/button';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TextareaModule } from '@openng/optimus-ui/textarea';
import { SelectButtonModule } from '@openng/optimus-ui/selectbutton';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PosterUpload } from '@app/components';
import { Genre } from '@app/services';

@Component({
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectButtonModule,
    PosterUpload,
  ],
  selector: 'app-create-movie',
  styleUrl: './create-movie.scss',
  templateUrl: './create-movie.html',
})
export class CreateMovie implements OnInit {
  private _genreService = inject(Genre);

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
    // poster: this.fb.control<File | null>(null, Validators.required),
    // title: ['', [Validators.required, Validators.maxLength(120)]],
    // synopsis: ['', [Validators.required, Validators.maxLength(400)]],
    // duration: this.fb.control<number | null>(null, [Validators.required, Validators.min(1), Validators.max(500)]),
    // releaseDate: this.fb.control<Date | null>(null, Validators.required),
    // ageRating: this.fb.control<number>(0, Validators.required),
    // genres: this.fb.control<string[]>([], Validators.required),
    // presale: this.fb.group({
    //   enabled: false,
    //   price: this.fb.control<number | null>({ value: null, disabled: true }, [
    //     Validators.required,
    //     Validators.min(1),
    //   ]),
    // }),
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

  selectPoster() {}

  async onCreate() {
    try {
      const data = this.form.getRawValue();

      console.log(data);
    } catch (error) {}
  }
}
