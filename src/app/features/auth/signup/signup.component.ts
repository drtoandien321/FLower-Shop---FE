import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="auth-container">
      <div class="auth-form-section">
        <div class="form-wrapper">
          <h1 class="title">Get Started Now</h1>
          
          <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                id="name" 
                formControlName="name"
                placeholder="Enter your name"
                autocomplete="name"
              />
              @if (signupForm.get('name')?.touched && signupForm.get('name')?.errors?.['required']) {
                <span class="error">Name is required</span>
              }
            </div>

            <div class="form-group">
              <label for="email">Email address</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email"
                placeholder="Enter your email"
                autocomplete="email"
              />
              @if (signupForm.get('email')?.touched && signupForm.get('email')?.errors?.['required']) {
                <span class="error">Email is required</span>
              }
              @if (signupForm.get('email')?.touched && signupForm.get('email')?.errors?.['email']) {
                <span class="error">Please enter a valid email</span>
              }
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                formControlName="password"
                placeholder="Name"
                autocomplete="new-password"
              />
              @if (signupForm.get('password')?.touched && signupForm.get('password')?.errors?.['required']) {
                <span class="error">Password is required</span>
              }
              @if (signupForm.get('password')?.touched && signupForm.get('password')?.errors?.['minlength']) {
                <span class="error">Password must be at least 6 characters</span>
              }
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="agreeTerms" />
                <span>I agree to the <a href="#" class="terms-link">terms & policy</a></span>
              </label>
              @if (signupForm.get('agreeTerms')?.touched && signupForm.get('agreeTerms')?.errors?.['requiredTrue']) {
                <span class="error">You must agree to the terms</span>
              }
            </div>

            @if (errorMessage()) {
              <div class="error-message">{{ errorMessage() }}</div>
            }

            <button type="submit" class="submit-btn" [disabled]="signupForm.invalid || isLoading()">
              {{ isLoading() ? 'Creating account...' : 'Signup' }}
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
            Have an account? <a routerLink="/login">Sign In</a>
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
      margin: 0 0 2rem 0;
      color: #1a1a1a;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    label {
      display: block;
      font-size: 0.9rem;
      font-weight: 500;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
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

    .terms-link {
      color: #2d5a27;
      text-decoration: underline;
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
export class SignupComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');

  signupForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    agreeTerms: [false, Validators.requiredTrue]
  });

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { name, email, password } = this.signupForm.getRawValue();
    
    // Simulate API delay
    setTimeout(() => {
      const success = this.authService.signup(name, email, password);
      this.isLoading.set(false);
      
      if (success) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage.set('Failed to create account. Please try again.');
      }
    }, 500);
  }
}
