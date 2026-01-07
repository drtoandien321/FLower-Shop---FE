import { Injectable, signal, computed } from '@angular/core';
import { Flower } from '../models/flower.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private readonly favoriteIds = signal<Set<string>>(new Set());
  private readonly favoriteFlowers = signal<Flower[]>([]);

  readonly favorites = computed(() => this.favoriteFlowers());
  readonly favoriteCount = computed(() => this.favoriteIds().size);

  isFavorite(flowerId: string): boolean {
    return this.favoriteIds().has(flowerId);
  }

  toggleFavorite(flower: Flower): void {
    const ids = new Set(this.favoriteIds());
    const flowers = [...this.favoriteFlowers()];
    
    if (ids.has(flower.id)) {
      ids.delete(flower.id);
      this.favoriteFlowers.set(flowers.filter(f => f.id !== flower.id));
    } else {
      ids.add(flower.id);
      this.favoriteFlowers.set([...flowers, flower]);
    }
    
    this.favoriteIds.set(ids);
  }

  removeFavorite(flowerId: string): void {
    const ids = new Set(this.favoriteIds());
    ids.delete(flowerId);
    this.favoriteIds.set(ids);
    this.favoriteFlowers.set(this.favoriteFlowers().filter(f => f.id !== flowerId));
  }
}
