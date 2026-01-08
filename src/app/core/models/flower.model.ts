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
  userId?: string;
  userName?: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  shippingAddress: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  avatarUrl?: string;
}
