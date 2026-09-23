import { Component } from '@angular/core';
import { CreateProduct } from './create-product/create-product';

@Component({
  imports: [CreateProduct],
  selector: 'app-products',
  styleUrl: './products.scss',
  templateUrl: './products.html',
})
export class Products {}
