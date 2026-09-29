import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { CandyBar, CheckoutSummary } from '@app/services';
import { FoodCard } from './food-card/food-card';
import { FoodCardSkeleton } from './food-card-skeleton/food-card-skeleton';
import { Skeleton } from '@openng/optimus-ui/skeleton';
import { MessageService } from '@openng/optimus-ui/api';
import { Toast } from '@openng/optimus-ui/toast';

@Component({
  imports: [CommonModule, FoodCard, FoodCardSkeleton, Skeleton, Toast],
  selector: 'app-food-step',
  styleUrl: './food-step.scss',
  templateUrl: './food-step.html',
  providers: [MessageService],
})
export class FoodStep {
  combos = signal<any[]>([]);
  loading = signal<boolean>(true);

  private readonly _messageService = inject(MessageService);
  private _candyBarService = inject(CandyBar);

  readonly skeletonItems = Array.from({ length: 12 });

  private _destroyRef = inject(DestroyRef);

  private readonly _checkoutSummary = inject(CheckoutSummary);

  combosSelected: any[] = [];

  constructor() {
    effect(() => {
      document.body.classList.toggle('is-locked', this.loading());
    });

    this._destroyRef.onDestroy(() => {
      document.body.classList.remove('is-locked');
    });
  }

  quantityOf(id: string): number {
    return this._checkoutSummary.quantityOf(id);
  }

  increase(combo: any): void {
    const added = this._checkoutSummary.addFoodItem(combo);

    if (!added) {
      this._messageService.add({
        detail: `Solo podés sumar hasta ${this._checkoutSummary.maxFoodItems} productos por pedido`,
      });
    }
  }

  decrease(combo: any): void {
    this._checkoutSummary.removeFoodItem(combo);
  }

  async ngOnInit() {
    const candyBar = await this._candyBarService.getGroupedCombos();

    this.combos.set(candyBar);

    this.loading.set(false);
  }
}
