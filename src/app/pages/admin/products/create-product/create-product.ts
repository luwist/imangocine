import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { Drawer } from '@openng/optimus-ui/drawer';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TextareaModule } from '@openng/optimus-ui/textarea';
import { SelectModule } from '@openng/optimus-ui/select';
import { ProductCategory } from '@app/services';

@Component({
  imports: [
    ReactiveFormsModule,
    Drawer,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
  ],
  selector: 'app-create-product',
  styleUrl: './create-product.scss',
  templateUrl: './create-product.html',
})
export class CreateProduct {
  private _productCategoryService = inject(ProductCategory);

  productCategories = signal<any[]>([]);

  visible = signal(false);
  isLoading = signal(false);

  async ngOnInit() {
    this.productCategories.set(await this._productCategoryService.getList());
  }

  close(): void {
    this.visible.set(false);
  }

  onOpen() {
    this.visible.set(true);
  }
}
