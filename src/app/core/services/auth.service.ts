import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/flower.model';
import { MOCK_USER, MOCK_ADMIN } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUser = signal<User | null>(null);
  private readonly isAuthenticated = signal(false);

  readonly user = computed(() => this.currentUser());
  readonly isLoggedIn = computed(() => this.isAuthenticated());
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  login(email: string, password: string): boolean {
    // Mock login - in real app, this would call an API
    if (email && password) {
      // Check if admin login
      if (email === 'admin@flowershop.com' && password === 'admin123') {
        this.currentUser.set(MOCK_ADMIN);
        this.isAuthenticated.set(true);
        return true;
      }
      // Regular user login
      this.currentUser.set(MOCK_USER);
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  signup(name: string, email: string, password: string): boolean {
    // Mock signup - in real app, this would call an API
    if (name && email && password) {
      const newUser: User = {
        id: crypto.randomUUID(),
        name,
        email,
        role: 'user'
      };
      this.currentUser.set(newUser);
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  updateProfile(updates: Partial<User>): void {
    const user = this.currentUser();
    if (user) {
      this.currentUser.set({ ...user, ...updates });
    }
  }
}
