import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="account-page">
      @if (authService.isLoggedIn()) {
        <div class="account-container">
          <aside class="account-sidebar">
            <div class="user-avatar">
              @if (authService.user()?.avatarUrl) {
                <img [src]="authService.user()?.avatarUrl" [alt]="authService.user()?.name" />
              } @else {
                <div class="avatar-placeholder">
                  {{ getInitials() }}
                </div>
              }
            </div>
            <h2 class="user-name">{{ authService.user()?.name }}</h2>
            <p class="user-email">{{ authService.user()?.email }}</p>

            <nav class="account-nav">
              <button 
                type="button"
                [class.active]="activeTab() === 'profile'"
                (click)="setActiveTab('profile')"
              >
                Profile
              </button>
              <button 
                type="button"
                [class.active]="activeTab() === 'orders'"
                (click)="setActiveTab('orders')"
              >
                My Orders
              </button>
              <a routerLink="/favorites">My Favorites</a>
              <button type="button" class="logout-btn" (click)="logout()">
                Log Out
              </button>
            </nav>
          </aside>

          <section class="account-content">
            @if (activeTab() === 'profile') {
              <div class="content-section">
                <h1>Account Information</h1>
                
                <form [formGroup]="profileForm" (ngSubmit)="saveProfile()">
                  <div class="form-row">
                    <div class="form-group">
                      <label for="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        formControlName="name"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div class="form-group">
                      <label for="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        formControlName="email"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label for="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        formControlName="phone"
                        placeholder="Enter your phone"
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="address">Address</label>
                    <textarea 
                      id="address" 
                      formControlName="address"
                      placeholder="Enter your address"
                      rows="3"
                    ></textarea>
                  </div>

                  @if (successMessage()) {
                    <div class="success-message">{{ successMessage() }}</div>
                  }

                  <div class="form-actions">
                    <button type="submit" class="save-btn" [disabled]="profileForm.invalid">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            }

            @if (activeTab() === 'orders') {
              <div class="content-section">
                <h1>My Orders</h1>
                <p class="section-subtitle">View and track your orders</p>
                <a routerLink="/orders" class="view-orders-link">Go to Order History →</a>
              </div>
            }
          </section>
        </div>
      } @else {
        <div class="not-logged-in">
          <h1>Please Log In</h1>
          <p>You need to be logged in to view your account.</p>
          <a routerLink="/login" class="login-btn">Log In</a>
        </div>
      }
    </main>
  `,
  styles: [`
    .account-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      min-height: 70vh;
    }

    .account-container {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 3rem;
    }

    .account-sidebar {
      background: #f9f9f9;
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
      height: fit-content;
    }

    .user-avatar img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
    }

    .avatar-placeholder {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #2d5a27;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 600;
      margin: 0 auto;
    }

    .user-name {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 1rem 0 0.25rem 0;
    }

    .user-email {
      color: #666;
      font-size: 0.9rem;
      margin: 0 0 1.5rem 0;
    }

    .account-nav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .account-nav button,
    .account-nav a {
      padding: 0.75rem 1rem;
      background: transparent;
      border: none;
      border-radius: 8px;
      text-align: left;
      cursor: pointer;
      font-size: 0.95rem;
      color: #666;
      text-decoration: none;
      transition: all 0.2s;
    }

    .account-nav button:hover,
    .account-nav a:hover {
      background: white;
      color: #1a1a1a;
    }

    .account-nav button.active {
      background: white;
      color: #1a1a1a;
      font-weight: 500;
    }

    .logout-btn {
      color: #e53935 !important;
      margin-top: 1rem;
    }

    .account-content {
      padding: 1rem 0;
    }

    .content-section h1 {
      font-size: 1.75rem;
      font-weight: 600;
      margin: 0 0 2rem 0;
    }

    .section-subtitle {
      color: #666;
      margin: -1.5rem 0 1.5rem 0;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: #1a1a1a;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #2d5a27;
    }

    .form-group textarea {
      resize: vertical;
    }

    .success-message {
      background: #e8f5e9;
      color: #2e7d32;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .form-actions {
      margin-top: 1rem;
    }

    .save-btn {
      padding: 0.875rem 2rem;
      background: #2d5a27;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .save-btn:hover:not(:disabled) {
      background: #1e3d1a;
    }

    .save-btn:disabled {
      background: #94a894;
      cursor: not-allowed;
    }

    .view-orders-link {
      display: inline-block;
      color: #2d5a27;
      font-weight: 500;
      text-decoration: none;
    }

    .view-orders-link:hover {
      text-decoration: underline;
    }

    .not-logged-in {
      text-align: center;
      padding: 4rem 2rem;
    }

    .not-logged-in h1 {
      font-size: 2rem;
      margin: 0 0 0.5rem 0;
    }

    .not-logged-in p {
      color: #666;
      margin: 0 0 2rem 0;
    }

    .login-btn {
      display: inline-block;
      padding: 0.875rem 2rem;
      background: #2d5a27;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
    }

    .login-btn:hover {
      background: #1e3d1a;
    }

    @media (max-width: 768px) {
      .account-container {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AccountComponent {
  protected readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  activeTab = signal<'profile' | 'orders'>('profile');
  successMessage = signal('');

  profileForm = this.fb.nonNullable.group({
    name: [this.authService.user()?.name || '', Validators.required],
    email: [this.authService.user()?.email || '', [Validators.required, Validators.email]],
    phone: [this.authService.user()?.phone || ''],
    address: [this.authService.user()?.address || '']
  });

  getInitials(): string {
    const name = this.authService.user()?.name || '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  setActiveTab(tab: 'profile' | 'orders'): void {
    this.activeTab.set(tab);
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.getRawValue());
      this.successMessage.set('Profile updated successfully!');
      setTimeout(() => this.successMessage.set(''), 3000);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
