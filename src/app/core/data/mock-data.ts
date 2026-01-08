import { Flower, Order, User } from '../models/flower.model';

export const MOCK_FLOWERS: Flower[] = [
  {
    id: '1',
    name: 'Minimal Red Tulip Flower Vase',
    price: 18.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat quis imperdiet sodales egestas. Neque suspendisse sed accumsan, molestie aliquet.',
    imageUrl: '/assets/1.jpg',
    category: 'tulip',
    inStock: true,
    rating: 4.5
  },
  {
    id: '2',
    name: 'Beautiful Red Rose Bouquet',
    price: 29.99,
    description: 'A stunning bouquet of fresh red roses, perfect for expressing love and admiration.',
    imageUrl: '/assets/2.webp',
    category: 'red-rose',
    inStock: true,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Pink Lotus Arrangement',
    price: 35.99,
    description: 'Elegant pink lotus flowers symbolizing purity and enlightenment.',
    imageUrl: '/assets/3.jpg',
    category: 'lotus',
    inStock: true,
    rating: 4.6
  },
  {
    id: '4',
    name: 'Fresh Jasmine Bundle',
    price: 15.99,
    description: 'Fragrant jasmine flowers known for their sweet scent and delicate appearance.',
    imageUrl: '/assets/5.jpeg',
    category: 'jasmine',
    inStock: true,
    rating: 4.3
  },
  {
    id: '5',
    name: 'Purple Orchid Collection',
    price: 45.99,
    description: 'Exotic purple orchids that add elegance to any space.',
    imageUrl: '/assets/6.jpg',
    category: 'orchid',
    inStock: true,
    rating: 4.9
  },
  {
    id: '6',
    name: 'Bright Sunflower Pot',
    price: 22.99,
    description: 'Cheerful sunflowers that bring warmth and happiness.',
    imageUrl: '/assets/7.jpg',
    category: 'sunflower',
    inStock: true,
    rating: 4.4
  },
  {
    id: '7',
    name: 'White Rose Wedding Set',
    price: 89.99,
    description: 'Elegant white roses perfect for weddings and special occasions.',
    imageUrl: '/assets/8.jpg',
    category: 'red-rose',
    inStock: true,
    rating: 4.7
  },
  {
    id: '8',
    name: 'Mixed Tulip Garden',
    price: 32.99,
    description: 'A colorful mix of tulips to brighten any room.',
    imageUrl: '/assets/9.jpg',
    category: 'tulip',
    inStock: false,
    rating: 4.2
  }
];

export const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'user',
  phone: '+1 234 567 890',
  address: '123 Flower Street, Garden City, GC 12345',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
};

export const MOCK_ADMIN: User = {
  id: 'admin-1',
  name: 'Admin',
  email: 'admin@flowershop.com',
  role: 'admin',
  phone: '+1 000 000 000',
  address: 'Admin Office, Flower Shop HQ'
};

export const MOCK_USERS: User[] = [
  MOCK_USER,
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    phone: '+1 234 567 891',
    address: '456 Garden Ave, Bloom City, BC 67890'
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    role: 'user',
    phone: '+1 234 567 892',
    address: '789 Rose Lane, Petal Town, PT 11111'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    userName: 'John Doe',
    items: [
      { flower: MOCK_FLOWERS[0], quantity: 2 },
      { flower: MOCK_FLOWERS[1], quantity: 1 }
    ],
    totalPrice: 67.97,
    status: 'delivered',
    createdAt: new Date('2026-01-05'),
    shippingAddress: '123 Flower Street, Garden City, GC 12345'
  },
  {
    id: 'ORD-002',
    userId: '2',
    userName: 'Jane Smith',
    items: [
      { flower: MOCK_FLOWERS[4], quantity: 1 }
    ],
    totalPrice: 45.99,
    status: 'shipped',
    createdAt: new Date('2026-01-06'),
    shippingAddress: '456 Garden Ave, Bloom City, BC 67890'
  },
  {
    id: 'ORD-003',
    userId: '1',
    userName: 'John Doe',
    items: [
      { flower: MOCK_FLOWERS[2], quantity: 3 },
      { flower: MOCK_FLOWERS[5], quantity: 2 }
    ],
    totalPrice: 153.95,
    status: 'pending',
    createdAt: new Date('2026-01-07'),
    shippingAddress: '123 Flower Street, Garden City, GC 12345'
  }
];
