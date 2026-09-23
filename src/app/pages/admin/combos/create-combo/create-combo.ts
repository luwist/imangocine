import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { Drawer } from '@openng/optimus-ui/drawer';

@Component({
  imports: [ReactiveFormsModule, ButtonModule, Drawer],
  selector: 'app-create-combo',
  styleUrl: './create-combo.scss',
  templateUrl: './create-combo.html',
})
export class CreateCombo {
  visible: boolean = false;

  onOpen() {
    this.visible = true;
  }
}
