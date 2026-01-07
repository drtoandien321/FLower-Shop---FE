import { Injectable, signal, computed } from '@angular/core';
import { Flower, FlowerCategory } from '../models/flower.model';
import { MOCK_FLOWERS } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {
  private readonly flowers = signal<Flower[]>(MOCK_FLOWERS);
  private readonly selectedCategory = signal<FlowerCategory | 'all'>('all');

  readonly allFlowers = computed(() => this.flowers());
  
  readonly filteredFlowers = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') {
      return this.flowers();
    }
    return this.flowers().filter(f => f.category === category);
  });

  readonly categories: { key: FlowerCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'Home' },
    { key: 'red-rose', label: 'Red rose' },
    { key: 'lotus', label: 'Lotus' },
    { key: 'jasmine', label: 'Jasmine' },
    { key: 'tulip', label: 'Tulip' },
    { key: 'orchid', label: 'Orchid' },
    { key: 'sunflower', label: 'Sunflower' }
  ];

  setCategory(category: FlowerCategory | 'all'): void {
    this.selectedCategory.set(category);
  }

  getFlowerById(id: string): Flower | undefined {
    return this.flowers().find(f => f.id === id);
  }

  getCurrentCategory(): FlowerCategory | 'all' {
    return this.selectedCategory();
  }
}
