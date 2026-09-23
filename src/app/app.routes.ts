import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/layout/layout.routes').then((m) => m.routes),
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.routes').then((m) => m.routes),
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.routes').then((m) => m.routes),
  },
];
