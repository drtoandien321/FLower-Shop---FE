import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-orders',
  imports: [RouterLink, CurrencyPipe, DatePipe, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="orders-page">
      <div class="page-header">
        <h1>Order History</h1>
        <p class="results-count">{{ orderService.allOrders().length }} orders</p>
      </div>

      @if (orderService.allOrders().length > 0) {
        <div class="orders-list">
          @for (order of orderService.allOrders(); track order.id) {
            <article class="order-card">
              <div class="order-header">
                <div class="order-info">
                  <h2 class="order-id">{{ order.id }}</h2>
                  <p class="order-date">{{ order.createdAt | date:'MMM d, y' }}</p>
                </div>
                <span class="order-status" [class]="order.status">
                  {{ order.status | titlecase }}
                </span>
              </div>

              <div class="order-items">
                @for (item of order.items; track item.flower.id) {
                  <div class="order-item">
                    <img 
                      [src]="item.flower.imageUrl" 
                      [alt]="item.flower.name"
                      class="item-image"
                    />
                    <div class="item-details">
                      <h3>{{ item.flower.name }}</h3>
                      <p>Qty: {{ item.quantity }} × {{ item.flower.price | currency }}</p>
                    </div>
                    <p class="item-total">{{ item.flower.price * item.quantity | currency }}</p>
                  </div>
                }
              </div>

              <div class="order-footer">
                <div class="shipping-address">
                  <strong>Shipping to:</strong>
                  <p>{{ order.shippingAddress }}</p>
                </div>
                <div class="order-total">
                  <span>Total:</span>
                  <strong>{{ order.totalPrice | currency }}</strong>
                </div>
              </div>
            </article>
          }
        </div>
      } @else {
        <div class="empty-state">
          <div class="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <h2>No orders yet</h2>
          <p>When you place orders, they will appear here.</p>
          <a routerLink="/products" class="browse-btn">Browse Flowers</a>
        </div>
      }
    </main>
  `,
  styles: [`
    .orders-page {
      max-width: 900px;
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

    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .order-card {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 16px;
      overflow: hidden;
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 1.5rem;
      background: #f9f9f9;
      border-bottom: 1px solid #e0e0e0;
    }

    .order-id {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
    }

    .order-date {
      font-size: 0.85rem;
      color: #666;
      margin: 0.25rem 0 0 0;
    }

    .order-status {
      padding: 0.375rem 0.875rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .order-status.pending {
      background: #fff3e0;
      color: #e65100;
    }

    .order-status.confirmed {
      background: #e3f2fd;
      color: #1565c0;
    }

    .order-status.shipped {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .order-status.delivered {
      background: #e8f5e9;
      color: #1b5e20;
    }

    .order-status.cancelled {
      background: #ffebee;
      color: #c62828;
    }

    .order-items {
      padding: 1rem 1.5rem;
    }

    .order-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 0;
    }

    .order-item:not(:last-child) {
      border-bottom: 1px solid #f0f0f0;
    }

    .item-image {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 8px;
    }

    .item-details {
      flex: 1;
    }

    .item-details h3 {
      font-size: 0.95rem;
      font-weight: 500;
      margin: 0 0 0.25rem 0;
    }

    .item-details p {
      font-size: 0.85rem;
      color: #666;
      margin: 0;
    }

    .item-total {
      font-weight: 600;
      margin: 0;
    }

    .order-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 1rem 1.5rem;
      background: #fafafa;
      border-top: 1px solid #e0e0e0;
    }

    .shipping-address strong {
      font-size: 0.8rem;
      color: #666;
    }

    .shipping-address p {
      font-size: 0.9rem;
      margin: 0.25rem 0 0 0;
    }

    .order-total {
      text-align: right;
    }

    .order-total span {
      display: block;
      font-size: 0.85rem;
      color: #666;
    }

    .order-total strong {
      font-size: 1.25rem;
      color: #2d5a27;
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

    @media (max-width: 600px) {
      .order-footer {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .order-total {
        text-align: left;
      }
    }
  `]
})
export class OrdersComponent {
  protected readonly orderService = inject(OrderService);
}
