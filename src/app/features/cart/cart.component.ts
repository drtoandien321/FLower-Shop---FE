import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="cart-page">
      <div class="page-header">
        <h1>Shopping Cart</h1>
        <p class="results-count">{{ cartService.totalItems() }} items</p>
      </div>

      @if (cartService.items().length > 0) {
        <div class="cart-container">
          <div class="cart-items">
            @for (item of cartService.items(); track item.flower.id) {
              <article class="cart-item">
                <img 
                  [src]="item.flower.imageUrl" 
                  [alt]="item.flower.name"
                  class="item-image"
                />
                <div class="item-details">
                  <h3>{{ item.flower.name }}</h3>
                  <p class="item-price">{{ item.flower.price | currency }}</p>
                </div>
                <div class="quantity-controls">
                  <button 
                    type="button"
                    (click)="updateQuantity(item.flower.id, item.quantity - 1)"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{{ item.quantity }}</span>
                  <button 
                    type="button"
                    (click)="updateQuantity(item.flower.id, item.quantity + 1)"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <p class="item-total">{{ item.flower.price * item.quantity | currency }}</p>
                <button 
                  type="button"
                  class="remove-btn"
                  (click)="removeItem(item.flower.id)"
                  aria-label="Remove item"
                >
                  ×
                </button>
              </article>
            }
          </div>

          <aside class="cart-summary">
            <h2>Order Summary</h2>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>{{ cartService.totalPrice() | currency }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <strong>{{ cartService.totalPrice() | currency }}</strong>
            </div>
            <button 
              type="button"
              class="checkout-btn"
              (click)="checkout()"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      } @else {
        <div class="empty-state">
          <div class="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any flowers to your cart yet.</p>
          <a routerLink="/products" class="browse-btn">Browse Flowers</a>
        </div>
      }
    </main>
  `,
  styles: [`
    .cart-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      min-height: 60vh;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .page-header h1 {
      font-size: 2rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    .results-count {
      color: #666;
      margin: 0;
    }

    .cart-container {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
      align-items: start;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cart-item {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem;
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
    }

    .item-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 8px;
    }

    .item-details {
      flex: 1;
    }

    .item-details h3 {
      font-size: 1.1rem;
      font-weight: 500;
      margin: 0 0 0.5rem 0;
    }

    .item-price {
      color: #666;
      margin: 0;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: #f5f5f5;
      padding: 0.5rem;
      border-radius: 8px;
    }

    .quantity-controls button {
      width: 32px;
      height: 32px;
      background: white;
      border: none;
      border-radius: 6px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .quantity-controls button:hover {
      background: #e0e0e0;
    }

    .quantity-controls span {
      min-width: 24px;
      text-align: center;
      font-weight: 500;
    }

    .item-total {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
      min-width: 80px;
      text-align: right;
    }

    .remove-btn {
      width: 32px;
      height: 32px;
      background: transparent;
      border: none;
      font-size: 1.5rem;
      color: #999;
      cursor: pointer;
      transition: color 0.2s;
    }

    .remove-btn:hover {
      color: #e53935;
    }

    .cart-summary {
      background: #f9f9f9;
      padding: 1.5rem;
      border-radius: 16px;
      position: sticky;
      top: 100px;
    }

    .cart-summary h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 1.5rem 0;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .summary-row.total {
      border-bottom: none;
      padding-top: 1rem;
      margin-top: 0.5rem;
      font-size: 1.1rem;
    }

    .summary-row.total strong {
      color: #2d5a27;
    }

    .checkout-btn {
      width: 100%;
      padding: 1rem;
      background: #2d5a27;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 1.5rem;
      transition: background-color 0.2s;
    }

    .checkout-btn:hover {
      background: #1e3d1a;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: #f9f9f9;
      border-radius: 16px;
    }

    .empty-icon {
      color: #ccc;
      margin-bottom: 1.5rem;
    }

    .empty-state h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    .empty-state p {
      color: #666;
      margin: 0 0 1.5rem 0;
    }

    .browse-btn {
      display: inline-block;
      padding: 0.875rem 2rem;
      background: #1a1a1a;
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .browse-btn:hover {
      background: #333;
    }

    @media (max-width: 900px) {
      .cart-container {
        grid-template-columns: 1fr;
      }

      .cart-item {
        flex-wrap: wrap;
      }

      .item-details {
        flex-basis: calc(100% - 116px);
      }

      .quantity-controls,
      .item-total,
      .remove-btn {
        margin-top: 1rem;
      }
    }
  `]
})
export class CartComponent {
  protected readonly cartService = inject(CartService);
  protected readonly orderService = inject(OrderService);
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  updateQuantity(flowerId: string, quantity: number): void {
    this.cartService.updateQuantity(flowerId, quantity);
  }

  removeItem(flowerId: string): void {
    this.cartService.removeFromCart(flowerId);
  }

  checkout(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const user = this.authService.user();
    if (user && this.cartService.items().length > 0) {
      this.orderService.createOrder(
        this.cartService.items(),
        user.address || '123 Flower Street, Garden City'
      );
      this.cartService.clearCart();
      this.router.navigate(['/orders']);
    }
  }
}
