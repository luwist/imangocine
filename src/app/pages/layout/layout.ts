import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@app/components';

@Component({
  imports: [RouterOutlet, Header],
  selector: 'app-layout',
  styleUrl: './layout.scss',
  templateUrl: './layout.html',
})
export class Layout {}
