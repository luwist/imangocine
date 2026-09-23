import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./checkout').then((m) => m.Checkout),
    children: [
      { path: '', redirectTo: 'showtime', pathMatch: 'full' },
      {
        path: 'showtime',
        loadComponent: () =>
          import('./steps/showtime-step/showtime-step').then((m) => m.ShowtimeStep),
      },
      {
        path: 'seats',
        loadComponent: () => import('./steps/seats-step/seats-step').then((m) => m.SeatsStep),
      },
      {
        path: 'food',
        loadComponent: () => import('./steps/food-step/food-step').then((m) => m.FoodStep),
      },
      {
        path: 'pay',
        loadComponent: () => import('./steps/payment-step/payment-step').then((m) => m.PaymentStep),
      },
    ],
  },
];
