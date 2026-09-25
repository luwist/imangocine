import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { MinuteToHoursPipe } from '@app/pipes';
import { CheckoutNavigation, CheckoutSummary } from '@app/services';
import { ButtonModule } from '@openng/optimus-ui/button';

@Component({
  imports: [CommonModule, ButtonModule, MinuteToHoursPipe],
  selector: 'app-summary',
  styleUrl: './summary.scss',
  templateUrl: './summary.html',
})
export class Summary {
  movie = input<any>();
  showtime = signal<any>(null);
  seats = signal<any[]>([]);
  foodItems = signal<any[]>([]);
  total = signal<any>(null);

  private _checkoutSummaryService = inject(CheckoutSummary);
  private _checkoutNavigationService = inject(CheckoutNavigation);

  checkoutSummary$ = this._checkoutSummaryService.checkoutSummary$;

  async onContinue() {
    await this._checkoutNavigationService.continue();
  }
}
