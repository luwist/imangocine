import { CommonModule } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MinuteToHoursPipe } from '@app/pipes';
import { ButtonModule } from '@openng/optimus-ui/button';

export interface HeroMovie {
  slug: string;
  title: string;
  synopsis: string;
  poster: string;
  age_restriction: number;
  rating?: number | null;
}

const AUTOPLAY_MS = 6000;
const AGE_LABELS: Record<number, string> = { 0: 'ATP', 13: '+13', 18: '+18' };

@Component({
  imports: [CommonModule, RouterLink, ButtonModule, MinuteToHoursPipe],
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
})
export class Hero {
  movies = input<any[]>([]);

  current = signal(0);
  paused = signal(false);

  private _reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    effect((onCleanup) => {
      this.current();

      if (this.paused() || this.movies().length < 2 || this._reducedMotion) return;

      const id = setTimeout(() => this.next(), AUTOPLAY_MS);

      onCleanup(() => clearTimeout(id));
    });
  }

  next() {
    this.goTo(this.current() + 1);
  }

  prev() {
    this.goTo(this.current() - 1);
  }

  goTo(index: number) {
    const total = this.movies().length;

    if (!total) return;

    this.current.set((index + total) % total);
  }

  ageLabel(value: number): string {
    return AGE_LABELS[value] ?? '';
  }
}
