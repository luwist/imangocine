import { inject, Service } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutSummary } from '../checkout-summary';
import { map } from 'rxjs';

@Service()
export class CheckoutNavigation {
  private _router = inject(Router);
  private _cart = inject(CheckoutSummary);

  static CHECKOUT_STEPS: any[] = ['showtime', 'seats', 'food', 'pay'];

  static STEP_CONFIG: any = {
    showtime: {
      isValid: (cart: any) => !!cart.snapshot.showtime,
      queryParams: (cart: any) => ({ showtime: cart.snapshot.showtime.id }),
    },
    seats: {
      isValid: (cart: any) => !!cart.snapshot.seats?.length,
      queryParams: (cart: any) => ({ seats: cart.snapshot.seats!.join(',') }),
    },
    food: {
      isValid: () => true,
      queryParams: () => ({}),
    },
    pay: {
      isValid: () => true,
      queryParams: () => ({}),
    },
  };

  canContinue$ = this._cart.checkoutSummary$.pipe(
    map(() => {
      const step = this.getCurrentStep();

      return step ? CheckoutNavigation.STEP_CONFIG[step].isValid(this._cart) : false;
    }),
  );

  async continue() {
    const step = this.getCurrentStep();
    if (!step || !CheckoutNavigation.STEP_CONFIG[step].isValid(this._cart)) return;

    const nextStep =
      CheckoutNavigation.CHECKOUT_STEPS[CheckoutNavigation.CHECKOUT_STEPS.indexOf(step) + 1];
    if (!nextStep) return;

    await this._router.navigate(['/checkout', nextStep], {
      queryParamsHandling: 'merge',
      queryParams: CheckoutNavigation.STEP_CONFIG[step].queryParams(this._cart),
    });
  }

  private getCurrentStep() {
    const match = this._router.url.match(/\/checkout\/(\w+)/);

    return CheckoutNavigation.CHECKOUT_STEPS.find((s) => s === match?.[1]);
  }
}
