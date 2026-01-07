import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Flower } from '../../../core/models/flower.model';

@Component({
  selector: 'app-flower-card',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="flower-card" [class.out-of-stock]="!flower().inStock">
      <div class="image-container">
        <img 
          [src]="flower().imageUrl" 
          [alt]="flower().name"
          class="flower-image"
          loading="lazy"
        />
        <button 
          type="button"
          class="favorite-btn" 
          [class.active]="isFavorite()"
          (click)="onFavoriteClick($event)"
          [attr.aria-label]="isFavorite() ? 'Remove from favorites' : 'Add to favorites'"
          [attr.aria-pressed]="isFavorite()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" [attr.fill]="isFavorite() ? '#e53935' : 'none'" stroke="currentColor" stroke-width="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </button>
      </div>
      
      <div class="card-content">
        <h3 class="flower-name">{{ flower().name }}</h3>
        <p class="flower-price">{{ flower().price | currency }}</p>
        
        @if (!flower().inStock) {
          <span class="out-of-stock-badge">Out of Stock</span>
        }
        
        <button 
          type="button"
          class="add-to-cart-btn"
          [disabled]="!flower().inStock"
          (click)="onAddToCart()"
        >
          Add to Cart
        </button>
      </div>
    </article>
  `,
  styles: [`
    .flower-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
      cursor: pointer;
    }

    .flower-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    }

    .flower-card.out-of-stock {
      opacity: 0.7;
    }

    .image-container {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
      background: #f8f8f8;
    }

    .flower-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .flower-card:hover .flower-image {
      transform: scale(1.05);
    }

    .favorite-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: white;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .favorite-btn:hover {
      transform: scale(1.1);
    }

    .favorite-btn.active {
      color: #e53935;
    }

    .card-content {
      padding: 1rem;
    }

    .flower-name {
      font-size: 1rem;
      font-weight: 500;
      margin: 0 0 0.5rem 0;
      color: #1a1a1a;
    }

    .flower-price {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d5a27;
      margin: 0 0 1rem 0;
    }

    .out-of-stock-badge {
      display: inline-block;
      background: #f5f5f5;
      color: #666;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }

    .add-to-cart-btn {
      width: 100%;
      padding: 0.75rem;
      background: #1a1a1a;
      color: white;
      border: none;
      border-radius: 24px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .add-to-cart-btn:hover:not(:disabled) {
      background: #333;
    }

    .add-to-cart-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class FlowerCardComponent {
  flower = input.required<Flower>();
  isFavorite = input(false);
  
  addToCart = output<Flower>();
  toggleFavorite = output<Flower>();

  onAddToCart(): void {
    this.addToCart.emit(this.flower());
  }

  onFavoriteClick(event: Event): void {
    event.stopPropagation();
    this.toggleFavorite.emit(this.flower());
  }
}
