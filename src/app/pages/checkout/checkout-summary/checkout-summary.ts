import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-checkout-summary',
  styleUrl: './checkout-summary.scss',
  templateUrl: './checkout-summary.html',
})
export class CheckoutSummary {
  movie = input<any>();
  showtime = input<any | null>(null);
  seats = input<string[]>([]);
  foodItems = input<any[]>([]);
  total = input(0);

  continue = output<void>();
}
