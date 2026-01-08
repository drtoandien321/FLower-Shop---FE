import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FlowerService } from '../../core/services/flower.service';
import { CartService } from '../../core/services/cart.service';
import { FavoriteService } from '../../core/services/favorite.service';
import { FlowerCardComponent } from '../../shared/components/flower-card/flower-card.component';
import { Flower } from '../../core/models/flower.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CurrencyPipe, FlowerCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              <em>Minimal red tulip<br/>flower vase.</em>
            </h1>
            <p class="hero-price">{{ featuredFlower().price | currency }}</p>
            <p class="hero-description">{{ featuredFlower().description }}</p>
            
            <div class="hero-actions">
              <button 
                type="button" 
                class="add-to-cart-btn"
                (click)="addToCart(featuredFlower())"
              >
                Add to Cart
              </button>
              <button 
                type="button"
                class="favorite-btn"
                [class.active]="favoriteService.isFavorite(featuredFlower().id)"
                (click)="toggleFavorite(featuredFlower())"
                [attr.aria-label]="favoriteService.isFavorite(featuredFlower().id) ? 'Remove from favorites' : 'Add to favorites'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" [attr.fill]="favoriteService.isFavorite(featuredFlower().id) ? '#e53935' : 'none'" stroke="currentColor" stroke-width="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="hero-image">
            <div class="image-frame">
              <img 
                [src]="featuredFlower().imageUrl" 
                [alt]="featuredFlower().name"
                class="featured-image"
              />
            </div>
          </div>
          
          <div class="hero-sidebar">
            <div class="navigation-arrows">
              <button 
                type="button" 
                class="nav-arrow" 
                (click)="previousFlower()"
                aria-label="Previous flower"
              >
                ←
              </button>
              <button 
                type="button" 
                class="nav-arrow" 
                (click)="nextFlower()"
                aria-label="Next flower"
              >
                →
              </button>
            </div>
            
            <div class="product-info">
              <h3>Description</h3>
              <p>{{ featuredFlower().description }}</p>
              
              <details class="info-section">
                <summary>Ingredients</summary>
                <p>Fresh flowers, decorative vase, flower food packet</p>
              </details>
              
              <details class="info-section">
                <summary>Testimonials</summary>
                <p>"Absolutely beautiful flowers! Great quality and fast delivery."</p>
              </details>
            </div>
          </div>
        </div>
        
        
      </section>

      <!-- Featured Products Section -->
      <section class="featured-section">
        <div class="section-header">
          <h2>Featured Flowers</h2>
          <a routerLink="/products" class="view-all">View All →</a>
        </div>
        
        <div class="products-grid">
          @for (flower of flowerService.allFlowers().slice(0, 4); track flower.id) {
            <app-flower-card
              [flower]="flower"
              [isFavorite]="favoriteService.isFavorite(flower.id)"
              (addToCart)="addToCart($event)"
              (toggleFavorite)="toggleFavorite($event)"
            />
          }
        </div>
      </section>
    </main>
  `,
  styles: [`
    .home {
      min-height: 100vh;
    }

    .hero {
      position: relative;
      padding: 2rem;
      min-height: 80vh;
      background: linear-gradient(135deg, #fff5f5 0%, #fff 50%, #f0fff0 100%);
      overflow: hidden;
    }

    .hero-content {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1.2fr 1fr;
      gap: 2rem;
      align-items: center;
      min-height: 70vh;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 400;
      line-height: 1.2;
      margin: 0 0 1rem 0;
      color: #1a1a1a;
    }

    .hero-price {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0 0 1rem 0;
    }

    .hero-description {
      color: #666;
      line-height: 1.6;
      margin: 0 0 2rem 0;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .add-to-cart-btn {
      padding: 1rem 2rem;
      background: #1a1a1a;
      color: white;
      border: none;
      border-radius: 30px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .add-to-cart-btn:hover {
      background: #333;
    }

    .favorite-btn {
      width: 48px;
      height: 48px;
      background: transparent;
      border: 1px solid #e0e0e0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }

    .favorite-btn:hover {
      border-color: #e53935;
    }

    .favorite-btn.active {
      color: #e53935;
      border-color: #e53935;
    }

    .hero-image {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .image-frame {
      position: relative;
      width: 100%;
      max-width: 400px;
      aspect-ratio: 3/4;
      background: #d4c4b0;
      border-radius: 0 0 200px 200px;
      overflow: hidden;
    }

    .featured-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-sidebar {
      padding-left: 2rem;
    }

    .navigation-arrows {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }

    .nav-arrow {
      width: 40px;
      height: 40px;
      background: transparent;
      border: 1px solid #e0e0e0;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      transition: all 0.2s;
    }

    .nav-arrow:hover {
      background: #1a1a1a;
      color: white;
      border-color: #1a1a1a;
    }

    .product-info h3 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    .product-info > p {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0 0 1.5rem 0;
    }

    .info-section {
      border-top: 1px solid #e0e0e0;
      padding: 1rem 0;
    }

    .info-section summary {
      font-weight: 500;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .info-section summary::after {
      content: '+';
      font-size: 1.2rem;
    }

    .info-section[open] summary::after {
      content: '-';
    }

    .info-section p {
      color: #666;
      font-size: 0.9rem;
      margin: 0.5rem 0 0 0;
    }

    .decor {
      position: absolute;
      width: 150px;
      opacity: 0.6;
    }

    .decor img {
      width: 100%;
      height: auto;
    }

    .decor-left {
      bottom: 0;
      left: 0;
    }

    .decor-right {
      top: 20%;
      right: 0;
    }

    .featured-section {
      max-width: 1400px;
      margin: 0 auto;
      padding: 4rem 2rem;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .section-header h2 {
      font-size: 1.75rem;
      font-weight: 600;
      margin: 0;
    }

    .view-all {
      color: #2d5a27;
      text-decoration: none;
      font-weight: 500;
    }

    .view-all:hover {
      text-decoration: underline;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }

    @media (max-width: 1024px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .hero-text {
        order: 2;
      }

      .hero-image {
        order: 1;
      }

      .hero-sidebar {
        order: 3;
        padding-left: 0;
      }

      .hero-title {
        font-size: 2rem;
      }

      .hero-actions {
        justify-content: center;
      }

      .navigation-arrows {
        justify-content: center;
      }

      .decor {
        display: none;
      }
    }
  `]
})
export class HomeComponent {
  protected readonly flowerService = inject(FlowerService);
  protected readonly cartService = inject(CartService);
  protected readonly favoriteService = inject(FavoriteService);

  private currentIndex = signal(0);

  featuredFlower = () => {
    const flowers = this.flowerService.allFlowers();
    return flowers[this.currentIndex()] || flowers[0];
  };

  addToCart(flower: Flower): void {
    this.cartService.addToCart(flower);
  }

  toggleFavorite(flower: Flower): void {
    this.favoriteService.toggleFavorite(flower);
  }

  nextFlower(): void {
    const flowers = this.flowerService.allFlowers();
    this.currentIndex.set((this.currentIndex() + 1) % flowers.length);
  }

  previousFlower(): void {
    const flowers = this.flowerService.allFlowers();
    const newIndex = this.currentIndex() - 1;
    this.currentIndex.set(newIndex < 0 ? flowers.length - 1 : newIndex);
  }
}
