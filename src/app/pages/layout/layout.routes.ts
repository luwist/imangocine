import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        title: 'Inicio',
        loadComponent: () => import('./home/home').then((m) => m.Home),
      },
      {
        path: 'movie/:slug',
        title: 'Movie Detail',
        loadComponent: () => import('./movie-detail/movie-detail').then((m) => m.MovieDetail),
      },
    ],
  },
];
