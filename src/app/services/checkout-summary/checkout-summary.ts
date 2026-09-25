import { Service, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Service()
export class CheckoutSummary {
  private _checkoutSummary = new BehaviorSubject<any>({});

  checkoutSummary$ = this._checkoutSummary.asObservable();

  get snapshot() {
    return this._checkoutSummary.getValue();
  }

  setMovie(movie: any): void {
    this.patch({ movie });
  }

  setShowtime(showtime: any): void {
    this.patch({ showtime });
  }

  setSeats(seats: string[]): void {
    console.log(seats);
    this.patch({ seats });
  }

  setFoodItems(foodItems: any[]): void {
    this.patch({ foodItems });
  }

  reset(): void {
    this._checkoutSummary.next({});
  }

  private patch(partial: any): void {
    this._checkoutSummary.next({ ...this.snapshot, ...partial });
  }
}
