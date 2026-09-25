import { Component, ElementRef, output, signal, viewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-avatar-uploader',
  styleUrl: './avatar-uploader.scss',
  templateUrl: './avatar-uploader.html',
})
export class AvatarUploader {
  fileSelected = output<File>();

  fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  photoPreview = signal<string | null>(null);

  openFilePicker(): void {
    this.fileInput().nativeElement.click();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const url = URL.createObjectURL(this.photoPreview() ? file : file);

      this.photoPreview.set(url);
      this.fileSelected.emit(file);
    }

    input.value = '';
  }
}
