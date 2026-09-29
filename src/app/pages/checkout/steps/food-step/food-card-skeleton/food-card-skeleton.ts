import { Component } from '@angular/core';
import { Skeleton } from '@openng/optimus-ui/skeleton';

@Component({
  imports: [Skeleton],
  selector: 'app-food-card-skeleton',
  styleUrl: './food-card-skeleton.scss',
  templateUrl: './food-card-skeleton.html',
})
export class FoodCardSkeleton {}
