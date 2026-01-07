import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Flower } from '../models/flower.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartItems = signal<CartItem[]>([]);

  readonly items = computed(() => this.cartItems());
  
  readonly totalItems = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly totalPrice = computed(() => 
    this.cartItems().reduce((sum, item) => sum + (item.flower.price * item.quantity), 0)
  );

  addToCart(flower: Flower, quantity = 1): void {
    const items = this.cartItems();
    const existingIndex = items.findIndex(item => item.flower.id === flower.id);
    
    if (existingIndex >= 0) {
      const updated = [...items];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + quantity
      };
      this.cartItems.set(updated);
    } else {
      this.cartItems.set([...items, { flower, quantity }]);
    }
  }

  removeFromCart(flowerId: string): void {
    this.cartItems.set(this.cartItems().filter(item => item.flower.id !== flowerId));
  }

  updateQuantity(flowerId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(flowerId);
      return;
    }

    const items = this.cartItems();
    const updated = items.map(item => 
      item.flower.id === flowerId ? { ...item, quantity } : item
    );
    this.cartItems.set(updated);
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}
