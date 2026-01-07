import { Injectable, signal, computed } from '@angular/core';
import { Order, CartItem } from '../models/flower.model';
import { MOCK_ORDERS } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly orders = signal<Order[]>(MOCK_ORDERS);

  readonly allOrders = computed(() => this.orders());

  createOrder(items: CartItem[], shippingAddress: string): Order {
    const totalPrice = items.reduce(
      (sum, item) => sum + (item.flower.price * item.quantity),
      0
    );

    const newOrder: Order = {
      id: `ORD-${String(this.orders().length + 1).padStart(3, '0')}`,
      items,
      totalPrice,
      status: 'pending',
      createdAt: new Date(),
      shippingAddress
    };

    this.orders.set([newOrder, ...this.orders()]);
    return newOrder;
  }

  getOrderById(id: string): Order | undefined {
    return this.orders().find(o => o.id === id);
  }
}
