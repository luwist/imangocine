import { Component } from '@angular/core';
import { MenuItem } from '@openng/optimus-ui/api';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-sidebar',
  styleUrl: './sidebar.scss',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  menuItems: MenuItem[] = [
    {
      label: '',
      items: [{ label: 'Resumen', icon: 'category', routerLink: 'dashboard' }],
    },
    {
      label: 'Cartelera',
      items: [
        { label: 'Películas', icon: 'videotape', routerLink: 'movies' },
        { label: 'Funciones', icon: 'calendar', routerLink: 'showtimes' },
        { label: 'Salas', icon: 'chair', routerLink: 'rooms' },
      ],
    },
    {
      label: 'Candy Bar',
      items: [
        { label: 'Productos', icon: 'bag', routerLink: 'products' },
        { label: 'Combos', icon: 'candy', routerLink: 'combos' },
      ],
    },
    {
      label: 'Ventas',
      items: [
        { label: 'Promociones', icon: 'discount-shape', routerLink: 'promotions' },
        { label: 'Fidelización', icon: 'medal-star', routerLink: 'loyalty' },
      ],
    },
    {
      label: 'Personas',
      items: [
        { label: 'Clientes', icon: 'profile-2-user', routerLink: 'clients' },
        { label: 'Empleados', icon: 'personal-card', routerLink: 'employees' },
      ],
    },
  ];
}
