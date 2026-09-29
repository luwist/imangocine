import { computed, Service, signal } from '@angular/core';

@Service()
export class CheckoutSummary {
  readonly maxFoodItems = 5;

  private readonly _state = signal<any>({ seats: [], food: [] });

  readonly state = this._state.asReadonly();

  readonly seats = computed<any[]>(() => this._state().seats ?? []);
  readonly food = computed<any[]>(() => this._state().food ?? []);

  readonly totalFoodUnits = computed(() =>
    this.food().reduce((acc, item) => acc + item.quantity, 0),
  );

  readonly ticketsSubtotal = computed(() =>
    this.seats().reduce((acc, seat) => acc + seat.price, 0),
  );

  readonly foodSubtotal = computed(() =>
    this.food().reduce((acc, item) => acc + item.combo.price * item.quantity, 0),
  );

  readonly subtotal = computed(() => this.ticketsSubtotal() + this.foodSubtotal());
  readonly discountAmount = computed(() => this._state().discountAmount ?? 0);
  readonly total = computed(() => Math.max(this.subtotal() - this.discountAmount(), 0));

  get snapshot() {
    return this._state();
  }

  setUserId(userId: any): void {
    this.patch({ userId });
  }

  setMovie(movie: any): void {
    this.patch({ movie });
  }

  setShowtime(showtime: any): void {
    this.patch({ showtime });
  }

  setSeats(seats: any[]): void {
    this.patch({ seats });
  }

  reset(): void {
    this._state.set({ seats: [], food: [] });
  }

  addFoodItem(combo: any): boolean {
    if (this.totalFoodUnits() >= this.maxFoodItems) return false;

    this.changeFoodQuantity(combo, 1);

    return true;
  }

  removeFoodItem(combo: any): void {
    this.changeFoodQuantity(combo, -1);
  }

  quantityOf(comboId: string): number {
    return this.food().find((item) => item.combo.id === comboId)?.quantity ?? 0;
  }

  private changeFoodQuantity(combo: any, delta: number): void {
    const food = this.food();
    const exists = food.some((item) => item.combo.id === combo.id);

    const updated = exists
      ? food.map((item) =>
          item.combo.id === combo.id ? { ...item, quantity: item.quantity + delta } : item,
        )
      : [...food, { combo, quantity: delta }];

    this.patch({ food: updated.filter((item) => item.quantity > 0) });
  }

  private patch(partial: any): void {
    this._state.update((state) => ({ ...state, ...partial }));
  }
}
