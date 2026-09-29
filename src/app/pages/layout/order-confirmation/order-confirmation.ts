import { Component, inject, OnInit, signal } from '@angular/core';
import { TicketCard } from './ticket-card/ticket-card';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@app/services';

@Component({
  imports: [TicketCard],
  selector: 'app-order-confirmation',
  styleUrl: './order-confirmation.scss',
  templateUrl: './order-confirmation.html',
})
export class OrderConfirmation implements OnInit {
  private _route = inject(ActivatedRoute);

  private _orderRepository = inject(Order);

  order = signal<any>(null);

  async ngOnInit() {
    const orderId = this._route.snapshot.paramMap.get('orderId')!;

    const order = await this._orderRepository.getById(orderId);

    console.log(order);

    this.order.set(order);
  }
}
