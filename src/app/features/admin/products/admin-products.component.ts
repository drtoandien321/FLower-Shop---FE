import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { Flower, FlowerCategory } from '../../../core/models/flower.model';

@Component({
  selector: 'app-admin-products',
  imports: [FormsModule, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="products-page">
      <header class="page-header">
        <div>
          <h1>Products Management</h1>
          <p class="subtitle">Manage your flower products</p>
        </div>
        <button type="button" class="btn-primary" (click)="openModal('add')">
          + Add Product
        </button>
      </header>

      <!-- Filters -->
      <div class="filters">
        <input 
          type="text" 
          placeholder="Search products..."
          [(ngModel)]="searchTerm"
          class="search-input"
        />
        <select [(ngModel)]="categoryFilter" class="filter-select">
          <option value="">All Categories</option>
          @for (cat of adminService.categories; track cat.key) {
            <option [value]="cat.key">{{ cat.label }}</option>
          }
        </select>
        <select [(ngModel)]="stockFilter" class="filter-select">
          <option value="">All Stock</option>
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      <!-- Products Grid -->
      <div class="products-grid">
        @for (product of filteredProducts(); track product.id) {
          <article class="product-card">
            <div class="product-image">
              <img [src]="product.imageUrl" [alt]="product.name" />
              @if (!product.inStock) {
                <span class="out-of-stock-badge">Out of Stock</span>
              }
            </div>
            <div class="product-info">
              <span class="category-tag">{{ product.category }}</span>
              <h3>{{ product.name }}</h3>
              <p class="price">{{ product.price | currency }}</p>
              <p class="description">{{ product.description }}</p>
              <div class="product-actions">
                <button type="button" class="btn-sm" (click)="toggleStock(product.id)">
                  {{ product.inStock ? '🚫 Mark Out of Stock' : '✅ Mark In Stock' }}
                </button>
                <button type="button" class="btn-sm" (click)="openModal('edit', product)">
                  ✏️ Edit
                </button>
                <button type="button" class="btn-sm delete" (click)="deleteProduct(product.id)">
                  🗑️ Delete
                </button>
              </div>
            </div>
          </article>
        } @empty {
          <div class="empty-message">
            <p>No products found</p>
          </div>
        }
      </div>

      <!-- Modal -->
      @if (showModal()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal" (click)="$event.stopPropagation()">
            <h2>{{ modalMode() === 'add' ? 'Add New Product' : 'Edit Product' }}</h2>
            
            <form (ngSubmit)="saveProduct()">
              <div class="form-row">
                <div class="form-group">
                  <label for="name">Product Name</label>
                  <input type="text" id="name" [(ngModel)]="formData.name" name="name" required />
                </div>
                <div class="form-group">
                  <label for="price">Price ($)</label>
                  <input type="number" id="price" [(ngModel)]="formData.price" name="price" step="0.01" min="0" required />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="category">Category</label>
                  <select id="category" [(ngModel)]="formData.category" name="category" required>
                    @for (cat of adminService.categories; track cat.key) {
                      <option [value]="cat.key">{{ cat.label }}</option>
                    }
                  </select>
                </div>
                <div class="form-group">
                  <label for="rating">Rating (1-5)</label>
                  <input type="number" id="rating" [(ngModel)]="formData.rating" name="rating" min="1" max="5" step="0.1" />
                </div>
              </div>

              <div class="form-group">
                <label for="imageUrl">Image URL</label>
                <input type="url" id="imageUrl" [(ngModel)]="formData.imageUrl" name="imageUrl" required />
              </div>

              <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" [(ngModel)]="formData.description" name="description" rows="3" required></textarea>
              </div>

              <div class="form-group checkbox-group">
                <label>
                  <input type="checkbox" [(ngModel)]="formData.inStock" name="inStock" />
                  In Stock
                </label>
              </div>

              <div class="modal-actions">
                <button type="button" class="btn-secondary" (click)="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">
                  {{ modalMode() === 'add' ? 'Add Product' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .products-page {
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
    }

    .page-header h1 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 0.25rem 0;
    }

    .subtitle {
      color: #666;
      margin: 0;
    }

    .btn-primary {
      background: #2d5a27;
      color: white;
      border: none;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-primary:hover {
      background: #234a1e;
    }

    .btn-secondary {
      background: #e9ecef;
      color: #333;
      border: none;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
    }

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .search-input {
      flex: 1;
      min-width: 250px;
      padding: 0.75rem 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 0.95rem;
    }

    .filter-select {
      padding: 0.75rem 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 0.95rem;
      min-width: 150px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .product-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .product-image {
      position: relative;
      aspect-ratio: 16/10;
      overflow: hidden;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .out-of-stock-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #c62828;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .product-info {
      padding: 1rem;
    }

    .category-tag {
      display: inline-block;
      background: #e8f5e9;
      color: #2d5a27;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
      margin-bottom: 0.5rem;
    }

    .product-info h3 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    .price {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d5a27;
      margin: 0 0 0.5rem 0;
    }

    .description {
      font-size: 0.85rem;
      color: #666;
      margin: 0 0 1rem 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .btn-sm {
      background: #f8f9fa;
      border: none;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-sm:hover {
      background: #e9ecef;
    }

    .btn-sm.delete:hover {
      background: #ffebee;
    }

    .empty-message {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      color: #999;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal h2 {
      margin: 0 0 1.5rem 0;
      font-size: 1.25rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    .form-group input,
    .form-group textarea,
    .form-group select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 0.95rem;
    }

    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .checkbox-group input[type="checkbox"] {
      width: auto;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }
  `]
})
export class AdminProductsComponent {
  protected readonly adminService = inject(AdminService);

  searchTerm = '';
  categoryFilter = '';
  stockFilter = '';
  
  showModal = signal(false);
  modalMode = signal<'add' | 'edit'>('add');
  editingProductId = signal<string | null>(null);
  
  formData: Partial<Flower> = {
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    category: 'red-rose',
    inStock: true,
    rating: 4.5
  };

  filteredProducts() {
    let products = this.adminService.allProducts();
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }
    
    if (this.categoryFilter) {
      products = products.filter(p => p.category === this.categoryFilter);
    }
    
    if (this.stockFilter === 'in-stock') {
      products = products.filter(p => p.inStock);
    } else if (this.stockFilter === 'out-of-stock') {
      products = products.filter(p => !p.inStock);
    }
    
    return products;
  }

  openModal(mode: 'add' | 'edit', product?: Flower): void {
    this.modalMode.set(mode);
    if (mode === 'edit' && product) {
      this.editingProductId.set(product.id);
      this.formData = { ...product };
    } else {
      this.editingProductId.set(null);
      this.formData = {
        name: '',
        price: 0,
        description: '',
        imageUrl: 'https://images.unsplash.com/photo-1518882605630-8eb771897914?w=500',
        category: 'red-rose',
        inStock: true,
        rating: 4.5
      };
    }
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  saveProduct(): void {
    if (!this.formData.name || !this.formData.price) return;

    if (this.modalMode() === 'add') {
      this.adminService.addProduct(this.formData as Omit<Flower, 'id'>);
    } else {
      const id = this.editingProductId();
      if (id) {
        this.adminService.updateProduct(id, this.formData);
      }
    }
    this.closeModal();
  }

  toggleStock(id: string): void {
    this.adminService.toggleProductStock(id);
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.deleteProduct(id);
    }
  }
}
