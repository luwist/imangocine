import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Combo } from '@app/services';
import { ButtonModule } from '@openng/optimus-ui/button';
import { ToggleSwitchModule } from '@openng/optimus-ui/toggleswitch';
import { CreateCombo } from './create-combo/create-combo';

@Component({
  imports: [CommonModule, ButtonModule, ToggleSwitchModule, CreateCombo],
  selector: 'app-combos',
  styleUrl: './combos.scss',
  templateUrl: './combos.html',
})
export class Combos implements OnInit {
  private _comboService = inject(Combo);

  combos = signal<any[]>([]);

  async ngOnInit() {
    this.combos.set(await this._comboService.getListWithItems());

    console.log(this.combos());
  }
}
