import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { QuantityStepper } from '@app/components/ui';

@Component({
  imports: [CommonModule, QuantityStepper],
  selector: 'app-food-card',
  styleUrl: './food-card.scss',
  templateUrl: './food-card.html',
})
export class FoodCard {
  readonly combo = input.required<any>();
  readonly quantity = input(0);

  readonly increase = output<any>();
  readonly decrease = output<any>();
}
