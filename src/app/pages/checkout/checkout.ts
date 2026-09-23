import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from './topbar/topbar';
import { CheckoutSummary } from './checkout-summary/checkout-summary';

@Component({
  imports: [RouterOutlet, Topbar, CheckoutSummary],
  selector: 'app-checkout',
  styleUrl: './checkout.scss',
  templateUrl: './checkout.html',
})
export class Checkout {}
