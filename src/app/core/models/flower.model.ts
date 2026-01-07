export interface Flower {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: FlowerCategory;
  inStock: boolean;
  rating: number;
}

export type FlowerCategory = 'red-rose' | 'lotus' | 'jasmine' | 'tulip' | 'orchid' | 'sunflower';

export interface CartItem {
  flower: Flower;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  shippingAddress: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatarUrl?: string;
}
