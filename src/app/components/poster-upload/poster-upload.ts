import { Component, OnDestroy, output, signal } from '@angular/core';

const MAX_SIZE_BYTES = 2 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];

@Component({
  imports: [],
  selector: 'app-poster-upload',
  styleUrl: './poster-upload.scss',
  templateUrl: './poster-upload.html',
})
export class PosterUpload implements OnDestroy {
  fileChange = output<File | null>();

  preview = signal<string | null>(null);
  error = signal<string | null>(null);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    input.value = '';

    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      this.error.set('Elegí una imagen JPG o PNG.');
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      this.error.set('La imagen no puede pesar más de 2 MB.');
      return;
    }

    this.error.set(null);
    this._setPreview(URL.createObjectURL(file));
    this.fileChange.emit(file);
  }

  remove() {
    this.error.set(null);
    this._setPreview(null);
    this.fileChange.emit(null);
  }

  ngOnDestroy() {
    this._setPreview(null);
  }

  private _setPreview(url: string | null) {
    const current = this.preview();

    if (current) URL.revokeObjectURL(current);

    this.preview.set(url);
  }
}
