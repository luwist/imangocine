import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin').then((m) => m.Admin),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        title: 'Panel de Control',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'movies',
        title: 'Películas',
        loadComponent: () => import('./movies/movies').then((m) => m.Movies),
      },
      {
        path: 'movies/create',
        title: 'Crear Película',
        loadComponent: () =>
          import('./movies/create-movie/create-movie').then((m) => m.CreateMovie),
      },
      {
        path: 'showtimes',
        title: 'Funciones',
        loadComponent: () => import('./showtimes/showtimes').then((m) => m.Showtimes),
      },
      {
        path: 'rooms',
        title: 'Salas',
        loadComponent: () => import('./rooms/rooms').then((m) => m.Rooms),
      },
      {
        path: 'products',
        title: 'Productos',
        loadComponent: () => import('./products/products').then((m) => m.Products),
      },
      {
        path: 'combos',
        title: 'Combos',
        loadComponent: () => import('./combos/combos').then((m) => m.Combos),
      },
    ],
  },
];
