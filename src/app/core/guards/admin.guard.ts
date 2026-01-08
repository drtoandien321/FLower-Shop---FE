import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  // If not logged in, redirect to login
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
  } else {
    // If logged in but not admin, redirect to home
    router.navigate(['/']);
  }
  
  return false;
};
