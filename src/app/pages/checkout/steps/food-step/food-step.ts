import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { CandyBar } from '@app/services';
import { Skeleton } from '@openng/optimus-ui/skeleton';

@Component({
  imports: [CommonModule, Skeleton],
  selector: 'app-food-step',
  styleUrl: './food-step.scss',
  templateUrl: './food-step.html',
})
export class FoodStep {
  combos = signal<any[]>([]);
  loading = signal<boolean>(true);

  private _candyBarService = inject(CandyBar);

  readonly skeletonItems = Array.from({ length: 12 });

  private _destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      document.body.classList.toggle('is-locked', this.loading());
    });

    this._destroyRef.onDestroy(() => {
      document.body.classList.remove('is-locked');
    });
  }

  async ngOnInit() {
    const candyBar = await this._candyBarService.getGroupedCombos();

    this.combos.set(candyBar);

    this.loading.set(false);
  }
}
