import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlowerService } from '../../../core/services/flower.service';
import { CartService } from '../../../core/services/cart.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { FlowerCardComponent } from '../../../shared/components/flower-card/flower-card.component';
import { Flower, FlowerCategory } from '../../../core/models/flower.model';

@Component({
  selector: 'app-flower-list',
  imports: [FlowerCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="flower-list-page">
      <div class="page-header">
        <h1>{{ getPageTitle() }}</h1>
        <p class="results-count">{{ flowerService.filteredFlowers().length }} products</p>
      </div>

      <div class="filters">
        <div class="category-filters">
          @for (category of flowerService.categories; track category.key) {
            <button 
              type="button"
              class="filter-btn"
              [class.active]="flowerService.getCurrentCategory() === category.key"
              (click)="filterByCategory(category.key)"
            >
              {{ category.label }}
            </button>
          }
        </div>
      </div>

      <div class="products-grid">
        @for (flower of flowerService.filteredFlowers(); track flower.id) {
          <app-flower-card
            [flower]="flower"
            [isFavorite]="favoriteService.isFavorite(flower.id)"
            (addToCart)="addToCart($event)"
            (toggleFavorite)="toggleFavorite($event)"
          />
        } @empty {
          <div class="empty-state">
            <p>No flowers found in this category.</p>
          </div>
        }
      </div>
    </main>
  `,
  styles: [`
    .flower-list-page {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
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

    .filters {
      margin-bottom: 2rem;
    }

    .category-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .filter-btn {
      padding: 0.5rem 1.25rem;
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 20px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .filter-btn:hover {
      border-color: #1a1a1a;
    }

    .filter-btn.active {
      background: #1a1a1a;
      color: white;
      border-color: #1a1a1a;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem 2rem;
      background: #f9f9f9;
      border-radius: 16px;
    }

    .empty-state p {
      color: #666;
      font-size: 1.1rem;
      margin: 0;
    }
  `]
})
export class FlowerListComponent implements OnInit {
  protected readonly flowerService = inject(FlowerService);
  protected readonly cartService = inject(CartService);
  protected readonly favoriteService = inject(FavoriteService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'] as FlowerCategory | undefined;
      if (category) {
        this.flowerService.setCategory(category);
      } else {
        this.flowerService.setCategory('all');
      }
    });
  }

  getPageTitle(): string {
    const category = this.flowerService.getCurrentCategory();
    if (category === 'all') {
      return 'All Flowers';
    }
    const categoryInfo = this.flowerService.categories.find(c => c.key === category);
    return categoryInfo?.label || 'Flowers';
  }

  filterByCategory(category: FlowerCategory | 'all'): void {
    this.flowerService.setCategory(category);
  }

  addToCart(flower: Flower): void {
    this.cartService.addToCart(flower);
  }

  toggleFavorite(flower: Flower): void {
    this.favoriteService.toggleFavorite(flower);
  }
}
