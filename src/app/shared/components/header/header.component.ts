import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <div class="header-container">
        <a routerLink="/" class="logo">Ann Flower</a>
        
        <nav class="nav" aria-label="Main navigation">
          <ul class="nav-list">
            <li>
              <a 
                routerLink="/"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                class="nav-link"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                routerLink="/products"
                routerLinkActive="active"
                class="nav-link"
              >
                Products
              </a>
            </li>
            <li>
              <a routerLink="/about" routerLinkActive="active" class="nav-link">About Us</a>
            </li>
          </ul>
        </nav>

        <div class="header-actions">
          @if (authService.isLoggedIn()) {
            <!-- Debug: Show current user role -->
            @if (authService.isAdmin()) {
              <a 
                routerLink="/admin"
                class="admin-btn"
                aria-label="Admin Panel"
              >
                Admin
              </a>
            }
            
            <a 
              routerLink="/favorites" 
              class="icon-btn" 
              aria-label="Favorites ({{ favoriteService.favoriteCount() }} items)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
              @if (favoriteService.favoriteCount() > 0) {
                <span class="badge">{{ favoriteService.favoriteCount() }}</span>
              }
            </a>
            
            <a 
              routerLink="/cart" 
              class="icon-btn" 
              aria-label="Cart ({{ cartService.totalItems() }} items)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
              @if (cartService.totalItems() > 0) {
                <span class="badge">{{ cartService.totalItems() }}</span>
              }
            </a>

            <a 
              routerLink="/orders" 
              class="icon-btn" 
              aria-label="Orders"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/>
                <path d="M12 11h4"/>
                <path d="M12 16h4"/>
                <path d="M8 11h.01"/>
                <path d="M8 16h.01"/>
              </svg>
            </a>

            <a 
              routerLink="/account"
              class="icon-btn"
              aria-label="Account"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="5"/>
                <path d="M20 21a8 8 0 1 0-16 0"/>
              </svg>
            </a>
          } @else {
            <a 
              routerLink="/login"
              class="login-btn"
            >
              Login
            </a>
          }
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid #eee;
    }

    .header-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1a1a1a;
      text-decoration: none;
    }

    .nav-list {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-link {
      color: #666;
      text-decoration: none;
      font-size: 0.95rem;
      transition: color 0.2s;
    }

    .nav-link:hover,
    .nav-link.active {
      color: #1a1a1a;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .icon-btn {
      position: relative;
      color: #1a1a1a;
      padding: 0.5rem;
      border-radius: 50%;
      transition: background-color 0.2s;
    }

    .icon-btn:hover {
      background-color: #f5f5f5;
    }

    .badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #2d5a27;
      color: white;
      font-size: 0.7rem;
      font-weight: 600;
      min-width: 18px;
      height: 18px;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .nav {
        display: none;
      }
      
      .header-container {
        padding: 1rem;
      }
    }

    .login-btn {
      padding: 0.5rem 1rem;
      background: #2d5a27;
      color: white;
      border-radius: 6px;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .login-btn:hover {
      background: #234a1e;
    }

    .admin-btn {
      padding: 0.5rem 1rem;
      background: #7b1fa2;
      color: white;
      border-radius: 6px;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .admin-btn:hover {
      background: #6a1b9a;
    }
  `]
})
export class HeaderComponent {
  protected readonly cartService = inject(CartService);
  protected readonly favoriteService = inject(FavoriteService);
  protected readonly authService = inject(AuthService);
}
