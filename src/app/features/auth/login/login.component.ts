import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="auth-container">
      <div class="auth-form-section">
        <div class="form-wrapper">
          <h1 class="title">Welcome back!</h1>
          <p class="subtitle">Enter your Credentials to access your account</p>
          
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="email">Email address</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email"
                placeholder="Enter your email"
                autocomplete="email"
              />
              @if (loginForm.get('email')?.touched && loginForm.get('email')?.errors?.['required']) {
                <span class="error">Email is required</span>
              }
              @if (loginForm.get('email')?.touched && loginForm.get('email')?.errors?.['email']) {
                <span class="error">Please enter a valid email</span>
              }
            </div>

            <div class="form-group">
              <div class="label-row">
                <label for="password">Password</label>
                <a href="#" class="forgot-link">forgot password</a>
              </div>
              <input 
                type="password" 
                id="password" 
                formControlName="password"
                placeholder="Name"
                autocomplete="current-password"
              />
              @if (loginForm.get('password')?.touched && loginForm.get('password')?.errors?.['required']) {
                <span class="error">Password is required</span>
              }
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="rememberMe" />
                <span>Remember for 30 days</span>
              </label>
            </div>

            @if (errorMessage()) {
              <div class="error-message">{{ errorMessage() }}</div>
            }

            <button type="submit" class="submit-btn" [disabled]="loginForm.invalid || isLoading()">
              {{ isLoading() ? 'Logging in...' : 'Login' }}
            </button>
          </form>

          <div class="divider">
            <span>Or</span>
          </div>

          <div class="social-buttons">
            <button type="button" class="social-btn">
              <img src="https://www.google.com/favicon.ico" alt="" width="20" height="20" />
              Sign in with Google
            </button>
          </div>

          <p class="switch-auth">
            Don't have an account? <a routerLink="/signup">Sign Up</a>
          </p>
        </div>
      </div>
      
      <div class="auth-image-section">
        <img 
          src="https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=800"
          alt="Decorative plant"
          class="auth-image"
        />
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 100vh;
    }

    .auth-form-section {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .form-wrapper {
      width: 100%;
      max-width: 400px;
    }

    .title {
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      color: #1a1a1a;
    }

    .subtitle {
      color: #666;
      margin: 0 0 2rem 0;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    label {
      display: block;
      font-size: 0.9rem;
      font-weight: 500;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
    }

    .forgot-link {
      font-size: 0.85rem;
      color: #2d5a27;
      text-decoration: none;
    }

    input[type="email"],
    input[type="password"],
    input[type="text"] {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #2d5a27;
    }

    input::placeholder {
      color: #aaa;
    }

    .checkbox-group {
      margin: 1rem 0;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 0.9rem;
      color: #666;
    }

    .checkbox-label input {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .error {
      display: block;
      color: #e53935;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    }

    .error-message {
      background: #ffebee;
      color: #c62828;
      padding: 0.75rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }

    .submit-btn {
      width: 100%;
      padding: 1rem;
      background: #2d5a27;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .submit-btn:hover:not(:disabled) {
      background: #1e3d1a;
    }

    .submit-btn:disabled {
      background: #94a894;
      cursor: not-allowed;
    }

    .divider {
      display: flex;
      align-items: center;
      margin: 1.5rem 0;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #e0e0e0;
    }

    .divider span {
      padding: 0 1rem;
      color: #999;
      font-size: 0.9rem;
    }

    .social-buttons {
      display: flex;
      gap: 1rem;
    }

    .social-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem;
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .social-btn:hover {
      background: #f5f5f5;
    }

    .switch-auth {
      text-align: center;
      margin-top: 1.5rem;
      color: #666;
      font-size: 0.9rem;
    }

    .switch-auth a {
      color: #2d5a27;
      font-weight: 600;
      text-decoration: none;
    }

    .auth-image-section {
      position: relative;
      overflow: hidden;
    }

    .auth-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 768px) {
      .auth-container {
        grid-template-columns: 1fr;
      }

      .auth-image-section {
        display: none;
      }
    }
  `]
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { email, password } = this.loginForm.getRawValue();
    
    // Simulate API delay
    setTimeout(() => {
      const success = this.authService.login(email, password);
      this.isLoading.set(false);
      
      if (success) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage.set('Invalid email or password');
      }
    }, 500);
  }
}
