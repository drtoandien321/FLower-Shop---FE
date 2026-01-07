import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../core/services/favorite.service';
import { CartService } from '../../core/services/cart.service';
import { FlowerCardComponent } from '../../shared/components/flower-card/flower-card.component';
import { Flower } from '../../core/models/flower.model';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink, FlowerCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="favorites-page">
      <div class="page-header">
        <h1>My Favorites</h1>
        <p class="results-count">{{ favoriteService.favorites().length }} items</p>
      </div>

      @if (favoriteService.favorites().length > 0) {
        <div class="products-grid">
          @for (flower of favoriteService.favorites(); track flower.id) {
            <app-flower-card
              [flower]="flower"
              [isFavorite]="true"
              (addToCart)="addToCart($event)"
              (toggleFavorite)="toggleFavorite($event)"
            />
          }
        </div>
      } @else {
        <div class="empty-state">
          <div class="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </div>
          <h2>No favorites yet</h2>
          <p>Start adding flowers to your favorites by clicking the heart icon on any product.</p>
          <a routerLink="/products" class="browse-btn">Browse Flowers</a>
        </div>
      }
    </main>
  `,
  styles: [`
    .favorites-page {
      max-width: 1400px;
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

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
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
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
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
  `]
})
export class FavoritesComponent {
  protected readonly favoriteService = inject(FavoriteService);
  protected readonly cartService = inject(CartService);

  addToCart(flower: Flower): void {
    this.cartService.addToCart(flower);
  }

  toggleFavorite(flower: Flower): void {
    this.favoriteService.toggleFavorite(flower);
  }
}
