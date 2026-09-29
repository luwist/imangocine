import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  private readonly _summary = inject(CheckoutSummary);
  private readonly _navigation = inject(CheckoutNavigation);

  readonly state = this._summary.state;
  readonly total = this._summary.total;
  readonly continueLabel = this._navigation.continueLabel;
  readonly submitting = this._navigation.submitting;
  readonly canContinue = this._navigation.canContinue;

  onContinue(): Promise<void> {
    return this._navigation.continue();
  }
}
