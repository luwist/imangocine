import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar, Topbar } from '@app/components';

@Component({
  imports: [RouterOutlet, Sidebar, Topbar],
  selector: 'app-admin',
  styleUrl: './admin.scss',
  templateUrl: './admin.html',
})
export class Admin {}
