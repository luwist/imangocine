import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string | null;

  if (!value) {
    return null;
  }

  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) {
    return { invalidDate: true };
  }

  const [, day, month, year] = match.map(Number);
  const date = new Date(year, month - 1, day);

  const isRealDate =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

  if (!isRealDate) {
    return { invalidDate: true };
  }

  if (date > new Date()) {
    return { futureDate: true };
  }

  return null;
}
