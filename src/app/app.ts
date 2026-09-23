import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Aura from '@openng/optimus-ui-themes/aura';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  ngOnInit() {
    console.log(Aura);
  }
}
