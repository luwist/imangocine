import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Showtime } from '@app/services';

const LANGUAGE_LABELS: Record<any['language'], string> = {
  original: 'Original',
  dubbed: 'Doblada',
  subtitled: 'Subtitulada',
};

@Component({
  imports: [CommonModule],
  selector: 'app-showtime-step',
  styleUrl: './showtime-step.scss',
  templateUrl: './showtime-step.html',
})
export class ShowtimeStep {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _showtimeService = inject(Showtime);

  protected readonly showtimes = signal<any[]>([]);
  protected readonly selectedDate = signal<string | null>(null);

  protected readonly dateOptions = computed<any[]>(() => {
    const a = this.buildDateOptions();

    console.log(a);

    return a;
  });

  protected readonly groupsForSelectedDate = computed<any[]>(() => {
    const date = this.selectedDate();
    if (!date) return [];

    const showtimesForDate = this.showtimes().filter((s) => s.starts_at.startsWith(date));

    const map = new Map<string, any[]>();
    for (const showtime of showtimesForDate) {
      const label = this.buildGroupLabel(showtime);
      map.set(label, [...(map.get(label) ?? []), showtime]);
    }

    console.log(Array.from(map, ([label, showtimes]) => ({ label, showtimes })));

    return Array.from(map, ([label, showtimes]) => ({ label, showtimes }));
  });

  async ngOnInit(): Promise<void> {
    const movieId = this._route.snapshot.queryParamMap.get('movie');
    if (!movieId) return;

    const showtimes = await this._showtimeService.getUpcomingByMovieId(movieId);
    this.showtimes.set(showtimes);

    console.log(this.showtimes());

    const options = this.buildDateOptions();

    if (options.length) this.selectedDate.set(options[0].value);
  }

  protected selectDate(date: string): void {
    this.selectedDate.set(date);
  }

  protected async selectShowtime(showtime: any) {
    console.log(showtime);

    await this._router.navigate(['../seats'], {
      relativeTo: this._route,
      queryParams: { showtime: showtime.id },
      queryParamsHandling: 'merge',
    });
  }

  private buildGroupLabel(showtime: any): string {
    const languageLabel = LANGUAGE_LABELS[showtime.language];
    return showtime.format === '2D' ? languageLabel : `${languageLabel} ${showtime.format}`;
  }

  private buildDateOptions(): any[] {
    const weekdayFormatter = new Intl.DateTimeFormat('es-AR', {
      weekday: 'long',
      timeZone: 'America/Argentina/Buenos_Aires',
    });
    const dayFormatter = new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      timeZone: 'America/Argentina/Buenos_Aires',
    });
    const monthFormatter = new Intl.DateTimeFormat('es-AR', {
      month: 'short',
      timeZone: 'America/Argentina/Buenos_Aires',
    });

    console.log(this.showtimes());

    const availableDates = Array.from(
      new Set(this.showtimes().map((s) => s.starts_at.slice(0, 10))),
    ).sort();

    return availableDates.map((value, index) => {
      const date = new Date(`${value}T12:00:00`); // mediodía evita saltos de día por huso horario
      let label: string;
      if (index === 0) label = 'Hoy';
      else if (index === 1) label = 'Mañana';
      else label = this.capitalize(weekdayFormatter.format(date));

      return {
        value,
        label,
        dayNumber: dayFormatter.format(date),
        monthLabel: monthFormatter.format(date).toUpperCase().replace('.', ''),
      };
    });
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
