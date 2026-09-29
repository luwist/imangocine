import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { CheckoutNavigation, CheckoutSummary, Order, Ticket } from '@app/services';

@Component({
  imports: [ReactiveFormsModule, InputTextModule],
  selector: 'app-payment-step',
  styleUrl: './payment-step.scss',
  templateUrl: './payment-step.html',
})
export class PaymentStep {
  private readonly _router = inject(Router);
  private readonly _navigation = inject(CheckoutNavigation);
  private readonly _checkoutSummary = inject(CheckoutSummary);
  private readonly _orderRepository = inject(Order);
  private readonly _ticketRepository = inject(Ticket);

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  getFormControl(controlName: string) {
    return this.form.get(controlName);
  }

  constructor() {
    this._navigation.registerSubmitHandler('pay', () => this._submit());

    inject(DestroyRef).onDestroy(() => this._navigation.unregisterSubmitHandler('pay'));
  }

  private async _submit(): Promise<boolean> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return false;
    }

    // const data = this._checkoutSummary.snapshot;
    const state = this._checkoutSummary.snapshot;

    // console.log(data);
    console.log(state);
    console.log(this._checkoutSummary.subtotal());
    console.log(this._checkoutSummary.discountAmount());
    console.log(this._checkoutSummary.total());

    const order = await this._orderRepository.add({
      user_id: state.userId,
      showtime_id: state.showtime.id,
      subtotal: this._checkoutSummary.subtotal(),
      discount_amount: this._checkoutSummary.discountAmount(),
      total: this._checkoutSummary.total(),
      status: 'paid',
    });

    const seats = state.seats.map((seat: any) => ({
      order_id: order.id,
      showtime_id: order.showtime_id,
      seat_code: seat.code,
      seat_type: seat.type,
      price: seat.price,
    }));

    console.log(seats);

    await this._ticketRepository.add(seats);

    await this._router.navigate(['/orders', order.id, 'confirmation']);

    this._checkoutSummary.reset();

    return true;
  }
}
