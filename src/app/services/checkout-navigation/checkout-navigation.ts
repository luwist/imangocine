import { computed, inject, Service, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { CheckoutSummary } from '../checkout-summary';

type CheckoutStep = 'showtime' | 'seats' | 'food' | 'pay';
type SubmitHandler = () => boolean | Promise<boolean>;

const STEP_VALIDATORS: Record<CheckoutStep, (cart: CheckoutSummary) => boolean> = {
  showtime: (cart) => !!cart.snapshot.showtime,
  seats: (cart) => !!cart.snapshot.seats?.length,
  food: () => true,
  pay: () => true,
};

@Service()
export class CheckoutNavigation {
  static readonly CHECKOUT_STEPS: CheckoutStep[] = ['showtime', 'seats', 'food', 'pay'];

  private readonly _router = inject(Router);
  private readonly _cart = inject(CheckoutSummary);
  private readonly _submitHandlers = new Map<CheckoutStep, SubmitHandler>();

  readonly submitting = signal(false);

  readonly currentStep = toSignal(
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this._getCurrentStep()),
    ),
    { initialValue: this._getCurrentStep() },
  );

  readonly continueLabel = computed(() =>
    this.currentStep() === 'pay' ? 'Realizar pago' : 'Continuar',
  );

  readonly canContinue = computed(() => {
    const step = this.currentStep();

    return !!step && STEP_VALIDATORS[step](this._cart);
  });

  registerSubmitHandler(step: CheckoutStep, handler: SubmitHandler): void {
    this._submitHandlers.set(step, handler);
  }

  unregisterSubmitHandler(step: CheckoutStep): void {
    this._submitHandlers.delete(step);
  }

  async continue(): Promise<void> {
    const step = this.currentStep();

    if (!step || this.submitting() || !this.canContinue()) return;

    const submit = this._submitHandlers.get(step);

    if (submit && !(await this._run(submit))) return;

    const nextStep =
      CheckoutNavigation.CHECKOUT_STEPS[CheckoutNavigation.CHECKOUT_STEPS.indexOf(step) + 1];

    if (!nextStep) return;

    await this._router.navigate(['/checkout', nextStep], {
      queryParamsHandling: 'merge',
      queryParams: step === 'showtime' ? { showtime: this._cart.snapshot.showtime.id } : {},
    });
  }

  private async _run(submit: SubmitHandler): Promise<boolean> {
    this.submitting.set(true);

    try {
      return await submit();
    } finally {
      this.submitting.set(false);
    }
  }

  private _getCurrentStep(): CheckoutStep | null {
    const match = this._router.url.match(/\/checkout\/(\w+)/);

    console.log(match);

    return CheckoutNavigation.CHECKOUT_STEPS.find((s) => s === match?.[1]) ?? null;
  }
}
