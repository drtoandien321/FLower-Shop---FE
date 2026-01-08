import { Injectable, signal, computed } from '@angular/core';
import { User, Flower, Order, FlowerCategory } from '../models/flower.model';
import { MOCK_USERS, MOCK_FLOWERS, MOCK_ORDERS } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // Users management
  private readonly users = signal<User[]>(MOCK_USERS);
  readonly allUsers = computed(() => this.users());
  readonly userCount = computed(() => this.users().length);

  // Products management
  private readonly products = signal<Flower[]>(MOCK_FLOWERS);
  readonly allProducts = computed(() => this.products());
  readonly productCount = computed(() => this.products().length);

  // Orders management
  private readonly orders = signal<Order[]>(MOCK_ORDERS);
  readonly allOrders = computed(() => this.orders());
  readonly orderCount = computed(() => this.orders().length);
  readonly pendingOrderCount = computed(() => 
    this.orders().filter(o => o.status === 'pending').length
  );

  // Statistics
  readonly totalRevenue = computed(() =>
    this.orders()
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, order) => sum + order.totalPrice, 0)
  );

  // ========== USER METHODS ==========
  
  getUser(id: string): User | undefined {
    return this.users().find(u => u.id === id);
  }

  addUser(user: Omit<User, 'id'>): void {
    const newUser: User = {
      ...user,
      id: crypto.randomUUID()
    };
    this.users.update(users => [...users, newUser]);
  }

  updateUser(id: string, updates: Partial<User>): void {
    this.users.update(users =>
      users.map(u => u.id === id ? { ...u, ...updates } : u)
    );
  }

  deleteUser(id: string): void {
    this.users.update(users => users.filter(u => u.id !== id));
  }

  // ========== PRODUCT METHODS ==========

  getProduct(id: string): Flower | undefined {
    return this.products().find(p => p.id === id);
  }

  addProduct(product: Omit<Flower, 'id'>): void {
    const newProduct: Flower = {
      ...product,
      id: crypto.randomUUID()
    };
    this.products.update(products => [...products, newProduct]);
  }

  updateProduct(id: string, updates: Partial<Flower>): void {
    this.products.update(products =>
      products.map(p => p.id === id ? { ...p, ...updates } : p)
    );
  }

  deleteProduct(id: string): void {
    this.products.update(products => products.filter(p => p.id !== id));
  }

  toggleProductStock(id: string): void {
    this.products.update(products =>
      products.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p)
    );
  }

  // ========== ORDER METHODS ==========

  getOrder(id: string): Order | undefined {
    return this.orders().find(o => o.id === id);
  }

  updateOrderStatus(id: string, status: Order['status']): void {
    this.orders.update(orders =>
      orders.map(o => o.id === id ? { ...o, status } : o)
    );
  }

  deleteOrder(id: string): void {
    this.orders.update(orders => orders.filter(o => o.id !== id));
  }

  // ========== CATEGORY HELPERS ==========
  
  readonly categories: { key: FlowerCategory; label: string }[] = [
    { key: 'red-rose', label: 'Red Rose' },
    { key: 'lotus', label: 'Lotus' },
    { key: 'jasmine', label: 'Jasmine' },
    { key: 'tulip', label: 'Tulip' },
    { key: 'orchid', label: 'Orchid' },
    { key: 'sunflower', label: 'Sunflower' }
  ];
}
