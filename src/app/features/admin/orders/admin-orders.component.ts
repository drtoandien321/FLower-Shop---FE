import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { Order, OrderStatus } from '../../../core/models/flower.model';

@Component({
  selector: 'app-admin-orders',
  imports: [FormsModule, CurrencyPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="orders-page">
      <header class="page-header">
        <div>
          <h1>Orders Management</h1>
          <p class="subtitle">Track and manage customer orders</p>
        </div>
      </header>

      <!-- Filters -->
      <div class="filters">
        <input 
          type="text" 
          placeholder="Search by Order ID or Customer..."
          [(ngModel)]="searchTerm"
          class="search-input"
        />
        <select [(ngModel)]="statusFilter" class="filter-select">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <!-- Stats -->
      <div class="order-stats">
        <div class="stat-item pending">
          <span class="stat-count">{{ getOrderCountByStatus('pending') }}</span>
          <span class="stat-label">Pending</span>
        </div>
        <div class="stat-item confirmed">
          <span class="stat-count">{{ getOrderCountByStatus('confirmed') }}</span>
          <span class="stat-label">Confirmed</span>
        </div>
        <div class="stat-item shipped">
          <span class="stat-count">{{ getOrderCountByStatus('shipped') }}</span>
          <span class="stat-label">Shipped</span>
        </div>
        <div class="stat-item delivered">
          <span class="stat-count">{{ getOrderCountByStatus('delivered') }}</span>
          <span class="stat-label">Delivered</span>
        </div>
      </div>

      <!-- Orders List -->
      <div class="orders-list">
        @for (order of filteredOrders(); track order.id) {
          <article class="order-card">
            <div class="order-header">
              <div class="order-id">
                <span class="label">Order ID</span>
                <span class="value">{{ order.id }}</span>
              </div>
              <span class="status-badge" [class]="order.status">{{ order.status }}</span>
            </div>

            <div class="order-details">
              <div class="detail-row">
                <span class="label">Customer:</span>
                <span class="value">{{ order.userName || 'Guest' }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Date:</span>
                <span class="value">{{ order.createdAt | date:'MMM d, y, h:mm a' }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Shipping:</span>
                <span class="value">{{ order.shippingAddress }}</span>
              </div>
            </div>

            <div class="order-items">
              <h4>Items ({{ getTotalItems(order) }})</h4>
              <ul>
                @for (item of order.items; track item.flower.id) {
                  <li>
                    <img [src]="item.flower.imageUrl" [alt]="item.flower.name" />
                    <div class="item-info">
                      <span class="item-name">{{ item.flower.name }}</span>
                      <span class="item-qty">x{{ item.quantity }}</span>
                    </div>
                    <span class="item-price">{{ item.flower.price * item.quantity | currency }}</span>
                  </li>
                }
              </ul>
            </div>

            <div class="order-footer">
              <div class="order-total">
                <span class="label">Total:</span>
                <span class="value">{{ order.totalPrice | currency }}</span>
              </div>
              <div class="order-actions">
                @if (order.status !== 'cancelled' && order.status !== 'delivered') {
                  <select 
                    [value]="order.status" 
                    (change)="updateStatus(order.id, $event)"
                    class="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                }
                <button type="button" class="btn-delete" (click)="deleteOrder(order.id)">
                  🗑️ Delete
                </button>
              </div>
            </div>
          </article>
        } @empty {
          <div class="empty-message">
            <p>No orders found</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .orders-page {
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      margin-bottom: 1.5rem;
    }

    .page-header h1 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 0.25rem 0;
    }

    .subtitle {
      color: #666;
      margin: 0;
    }

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .search-input {
      flex: 1;
      min-width: 250px;
      padding: 0.75rem 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 0.95rem;
    }

    .filter-select {
      padding: 0.75rem 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 0.95rem;
      min-width: 150px;
    }

    .order-stats {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .stat-item {
      background: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      text-align: center;
      min-width: 100px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .stat-count {
      display: block;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .stat-label {
      font-size: 0.85rem;
      color: #666;
    }

    .stat-item.pending .stat-count { color: #f57c00; }
    .stat-item.confirmed .stat-count { color: #1976d2; }
    .stat-item.shipped .stat-count { color: #7b1fa2; }
    .stat-item.delivered .stat-count { color: #388e3c; }

    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .order-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      background: #f8f9fa;
      border-bottom: 1px solid #eee;
    }

    .order-id .label {
      font-size: 0.75rem;
      color: #666;
      display: block;
    }

    .order-id .value {
      font-family: monospace;
      font-weight: 600;
      font-size: 1rem;
    }

    .status-badge {
      display: inline-block;
      padding: 0.375rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .status-badge.pending { background: #fff3e0; color: #f57c00; }
    .status-badge.confirmed { background: #e3f2fd; color: #1976d2; }
    .status-badge.shipped { background: #f3e5f5; color: #7b1fa2; }
    .status-badge.delivered { background: #e8f5e9; color: #388e3c; }
    .status-badge.cancelled { background: #ffebee; color: #c62828; }

    .order-details {
      padding: 1rem 1.5rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.75rem;
      border-bottom: 1px solid #eee;
    }

    .detail-row {
      display: flex;
      gap: 0.5rem;
    }

    .detail-row .label {
      color: #666;
      font-size: 0.875rem;
    }

    .detail-row .value {
      font-size: 0.875rem;
    }

    .order-items {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #eee;
    }

    .order-items h4 {
      margin: 0 0 0.75rem 0;
      font-size: 0.9rem;
      color: #666;
    }

    .order-items ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .order-items li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .order-items img {
      width: 40px;
      height: 40px;
      border-radius: 6px;
      object-fit: cover;
    }

    .item-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .item-name {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .item-qty {
      font-size: 0.75rem;
      color: #666;
    }

    .item-price {
      font-weight: 500;
      color: #2d5a27;
    }

    .order-footer {
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .order-total .label {
      font-size: 0.875rem;
      color: #666;
    }

    .order-total .value {
      font-size: 1.25rem;
      font-weight: 600;
      color: #2d5a27;
      margin-left: 0.5rem;
    }

    .order-actions {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    .status-select {
      padding: 0.5rem 0.75rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 0.875rem;
    }

    .btn-delete {
      background: #ffebee;
      color: #c62828;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: background 0.2s;
    }

    .btn-delete:hover {
      background: #ffcdd2;
    }

    .empty-message {
      text-align: center;
      padding: 3rem;
      color: #999;
      background: white;
      border-radius: 12px;
    }
  `]
})
export class AdminOrdersComponent {
  protected readonly adminService = inject(AdminService);

  searchTerm = '';
  statusFilter = '';

  filteredOrders() {
    let orders = this.adminService.allOrders();
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      orders = orders.filter(o =>
        o.id.toLowerCase().includes(term) ||
        (o.userName?.toLowerCase().includes(term) ?? false)
      );
    }
    
    if (this.statusFilter) {
      orders = orders.filter(o => o.status === this.statusFilter);
    }
    
    return orders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getOrderCountByStatus(status: OrderStatus): number {
    return this.adminService.allOrders().filter(o => o.status === status).length;
  }

  getTotalItems(order: Order): number {
    return order.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateStatus(orderId: string, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const status = select.value as OrderStatus;
    this.adminService.updateOrderStatus(orderId, status);
  }

  deleteOrder(id: string): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.adminService.deleteOrder(id);
    }
  }
}
