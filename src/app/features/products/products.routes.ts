import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./flower-list/flower-list.component').then(m => m.FlowerListComponent)
  }
];
