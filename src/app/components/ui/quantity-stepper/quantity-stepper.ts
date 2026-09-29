import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-quantity-stepper',
  styleUrl: './quantity-stepper.scss',
  templateUrl: './quantity-stepper.html',
})
export class QuantityStepper {
  readonly quantity = input.required<number>();
  readonly label = input('item');

  readonly increase = output<void>();
  readonly decrease = output<void>();
}
