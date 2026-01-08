import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard">
      <header class="dashboard-header">
        <h1>Dashboard</h1>
        <p class="subtitle">Welcome back! Here's what's happening with your store.</p>
      </header>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon users">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div class="stat-info">
            <h3>{{ adminService.userCount() }}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon products">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
            </svg>
          </div>
          <div class="stat-info">
            <h3>{{ adminService.productCount() }}</h3>
            <p>Products</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon orders">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/>
            </svg>
          </div>
          <div class="stat-info">
            <h3>{{ adminService.orderCount() }}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon revenue">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" x2="12" y1="2" y2="22"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div class="stat-info">
            <h3>{{ adminService.totalRevenue() | currency }}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions & Recent Orders -->
      <div class="dashboard-grid">
        <section class="quick-actions">
          <h2>Quick Actions</h2>
          <div class="actions-list">
            <a routerLink="/admin/products" class="action-item">
              <span class="action-icon">➕</span>
              <span>Add New Product</span>
            </a>
            <a routerLink="/admin/orders" class="action-item">
              <span class="action-icon">📋</span>
              <span>View Pending Orders ({{ adminService.pendingOrderCount() }})</span>
            </a>
            <a routerLink="/admin/users" class="action-item">
              <span class="action-icon">👥</span>
              <span>Manage Users</span>
            </a>
          </div>
        </section>

        <section class="recent-orders">
          <div class="section-header">
            <h2>Recent Orders</h2>
            <a routerLink="/admin/orders" class="view-all">View All</a>
          </div>
          <div class="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                @for (order of adminService.allOrders().slice(0, 5); track order.id) {
                  <tr>
                    <td class="order-id">{{ order.id }}</td>
                    <td>{{ order.userName || 'Guest' }}</td>
                    <td>{{ order.totalPrice | currency }}</td>
                    <td>
                      <span class="status-badge" [class]="order.status">
                        {{ order.status }}
                      </span>
                    </td>
                    <td>{{ order.createdAt | date:'MMM d, y' }}</td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="5" class="empty-message">No orders yet</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      font-size: 1.75rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    .subtitle {
      color: #666;
      margin: 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .stat-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon.users { background: #e3f2fd; color: #1976d2; }
    .stat-icon.products { background: #f3e5f5; color: #7b1fa2; }
    .stat-icon.orders { background: #fff3e0; color: #f57c00; }
    .stat-icon.revenue { background: #e8f5e9; color: #388e3c; }

    .stat-info h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 0.25rem 0;
    }

    .stat-info p {
      color: #666;
      margin: 0;
      font-size: 0.875rem;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 1.5rem;
    }

    .quick-actions, .recent-orders {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .quick-actions h2, .recent-orders h2 {
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
    }

    .actions-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .action-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      background: #f8f9fa;
      border-radius: 8px;
      text-decoration: none;
      color: #333;
      transition: background 0.2s;
    }

    .action-item:hover {
      background: #e9ecef;
    }

    .action-icon {
      font-size: 1.25rem;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .view-all {
      color: #2d5a27;
      text-decoration: none;
      font-size: 0.875rem;
    }

    .orders-table {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 0.875rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      font-weight: 600;
      color: #666;
      font-size: 0.875rem;
    }

    .order-id {
      font-family: monospace;
      font-weight: 500;
    }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .status-badge.pending { background: #fff3e0; color: #f57c00; }
    .status-badge.confirmed { background: #e3f2fd; color: #1976d2; }
    .status-badge.shipped { background: #f3e5f5; color: #7b1fa2; }
    .status-badge.delivered { background: #e8f5e9; color: #388e3c; }
    .status-badge.cancelled { background: #ffebee; color: #c62828; }

    .empty-message {
      text-align: center;
      color: #999;
      padding: 2rem;
    }

    @media (max-width: 992px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminDashboardComponent {
  protected readonly adminService = inject(AdminService);
}
