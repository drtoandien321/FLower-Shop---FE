# Flower Shop - Angular Application

Dự án web bán hoa được xây dựng với Angular 21+ và TypeScript.

## Mục Lục

1. [Giới thiệu về TypeScript](#giới-thiệu-về-typescript)
2. [Cấu trúc dự án](#cấu-trúc-dự-án)
3. [Giải thích các khái niệm quan trọng](#giải-thích-các-khái-niệm-quan-trọng)
4. [Luồng hoạt động của ứng dụng](#luồng-hoạt-động-của-ứng-dụng)
5. [Hướng dẫn chạy dự án](#hướng-dẫn-chạy-dự-án)

---

## Giới thiệu về TypeScript

TypeScript là JavaScript với kiểu dữ liệu. Nó giúp phát hiện lỗi sớm và code dễ đọc hơn.

### Ví dụ so sánh JavaScript vs TypeScript

```javascript
// JavaScript - Không có kiểu dữ liệu
let price = 100;
price = "một trăm"; // Không báo lỗi, nhưng có thể gây bug

function calculateTotal(items) {
  // Không biết items là gì
}
```

```typescript
// TypeScript - Có kiểu dữ liệu
let price: number = 100;
price = "một trăm"; // ❌ LỖI! TypeScript báo ngay

function calculateTotal(items: CartItem[]): number {
  // Biết rõ items là mảng CartItem, trả về số
}
```

### Interface - Định nghĩa cấu trúc dữ liệu

```typescript
// File: src/app/core/models/flower.model.ts

// Interface = "Bản vẽ" mô tả dữ liệu phải có những gì
export interface Flower {
  id: string;           // ID duy nhất
  name: string;         // Tên hoa
  price: number;        // Giá (số)
  description: string;  // Mô tả
  imageUrl: string;     // Link ảnh
  category: FlowerCategory; // Loại hoa
  inStock: boolean;     // Còn hàng không (true/false)
  rating: number;       // Đánh giá
}

// Type = Giới hạn giá trị có thể có
export type FlowerCategory = 'red-rose' | 'lotus' | 'jasmine' | 'tulip' | 'orchid' | 'sunflower';
// ↑ category CHỈ có thể là 1 trong 6 giá trị này, không thể là "abc"
```

---

## Cấu trúc dự án

```
src/
├── app/
│   ├── app.component.ts      # Component gốc - khung chính của app
│   ├── app.config.ts         # Cấu hình Angular
│   ├── app.routes.ts         # Định nghĩa đường dẫn URL
│   │
│   ├── core/                 # 🧠 PHẦN LÕI - Logic nghiệp vụ
│   │   ├── guards/           # Bảo vệ route (kiểm tra đăng nhập)
│   │   │   └── auth.guard.ts
│   │   ├── models/           # Định nghĩa kiểu dữ liệu
│   │   │   └── flower.model.ts
│   │   ├── services/         # Xử lý logic, quản lý dữ liệu
│   │   │   ├── auth.service.ts     # Đăng nhập/đăng xuất
│   │   │   ├── cart.service.ts     # Giỏ hàng
│   │   │   ├── favorite.service.ts # Yêu thích
│   │   │   ├── flower.service.ts   # Danh sách hoa
│   │   │   └── order.service.ts    # Đơn hàng
│   │   └── data/
│   │       └── mock-data.ts  # Dữ liệu giả lập
│   │
│   ├── features/             # 📱 CÁC TRANG CHỨC NĂNG
│   │   ├── home/             # Trang chủ
│   │   ├── products/         # Danh sách sản phẩm
│   │   ├── cart/             # Giỏ hàng
│   │   ├── favorites/        # Yêu thích
│   │   ├── orders/           # Đơn hàng
│   │   ├── account/          # Tài khoản
│   │   └── auth/             # Đăng nhập/Đăng ký
│   │
│   └── shared/               # 🔧 THÀNH PHẦN DÙNG CHUNG
│       └── components/
│           ├── header/       # Thanh điều hướng trên
│           ├── footer/       # Chân trang
│           └── flower-card/  # Card hiển thị hoa
│
└── assets/                   # Hình ảnh, fonts...
```

---

## Giải thích các khái niệm quan trọng

### 1. Component - Thành phần giao diện

Component là khối xây dựng cơ bản của Angular. Mỗi component có 3 phần:

```typescript
// File: src/app/shared/components/header/header.component.ts

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  // ========== CẤU HÌNH ==========
  selector: 'app-header',  // Tên thẻ HTML: <app-header></app-header>
  imports: [RouterLink, RouterLinkActive], // Module cần dùng
  changeDetection: ChangeDetectionStrategy.OnPush, // Tối ưu hiệu suất
  
  // ========== GIAO DIỆN (HTML) ==========
  template: `
    <header class="header">
      <nav class="nav">
        <!-- routerLink = link điều hướng -->
        <a routerLink="/">Home</a>
        <a routerLink="/products">Products</a>
        
        <!-- @if = hiển thị có điều kiện -->
        @if (authService.isLoggedIn()) {
          <!-- Chỉ hiển thị khi đã đăng nhập -->
          <a routerLink="/cart">Cart</a>
          <a routerLink="/account">Account</a>
        } @else {
          <a routerLink="/login">Login</a>
        }
      </nav>
    </header>
  `,
  
  // ========== STYLE (CSS) ==========
  styles: [`
    .header {
      background: white;
      padding: 1rem;
    }
  `]
})
export class HeaderComponent {
  // ========== LOGIC ==========
  
  // inject() = "tiêm" service vào component
  // protected = chỉ dùng trong component này và template
  protected readonly authService = inject(AuthService);
}
```

**Cách sử dụng component:**
```html
<!-- Trong app.component.ts -->
<app-header></app-header>  <!-- Hiển thị header -->
<router-outlet></router-outlet>  <!-- Hiển thị trang hiện tại -->
<app-footer></app-footer>  <!-- Hiển thị footer -->
```

### 2. Service - Xử lý logic và dữ liệu

Service là nơi xử lý logic nghiệp vụ, quản lý dữ liệu, và chia sẻ giữa các component.

```typescript
// File: src/app/core/services/auth.service.ts

import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/flower.model';

@Injectable({
  providedIn: 'root'  // Singleton - chỉ có 1 instance trong toàn app
})
export class AuthService {
  
  // ========== SIGNALS - Quản lý trạng thái ==========
  
  // signal() = biến có thể theo dõi thay đổi
  // private = chỉ dùng bên trong service
  private readonly currentUser = signal<User | null>(null);
  private readonly isAuthenticated = signal(false);

  // computed() = giá trị tính toán từ signal khác
  // readonly = chỉ đọc, không thể gán lại
  readonly user = computed(() => this.currentUser());
  readonly isLoggedIn = computed(() => this.isAuthenticated());

  // ========== PHƯƠNG THỨC ==========
  
  login(email: string, password: string): boolean {
    if (email && password) {
      // Cập nhật signal bằng .set()
      this.currentUser.set({ id: '1', name: 'User', email });
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }
}
```

**Cách sử dụng service trong component:**
```typescript
// Trong component
export class HeaderComponent {
  // Tiêm service
  protected readonly authService = inject(AuthService);
  
  // Sử dụng trong template:
  // authService.isLoggedIn() → trả về true/false
  // authService.user() → trả về User hoặc null
}
```

### 3. Signal - Quản lý trạng thái hiện đại

Signal là cách mới để quản lý state trong Angular, thay thế cho RxJS trong nhiều trường hợp.

```typescript
import { signal, computed } from '@angular/core';

// ===== TẠO SIGNAL =====
const count = signal(0);           // signal với giá trị ban đầu = 0
const items = signal<string[]>([]); // signal là mảng string

// ===== ĐỌC GIÁ TRỊ =====
console.log(count());  // 0 - Gọi như hàm để lấy giá trị

// ===== CẬP NHẬT GIÁ TRỊ =====
count.set(5);          // Gán giá trị mới = 5
count.update(n => n + 1); // Cập nhật dựa trên giá trị cũ → 6

// ===== COMPUTED - Giá trị phái sinh =====
const doubled = computed(() => count() * 2);
// doubled() sẽ tự động cập nhật khi count() thay đổi
// count = 6 → doubled = 12
```

**Ví dụ thực tế trong Cart Service:**
```typescript
// File: src/app/core/services/cart.service.ts

export class CartService {
  // Danh sách items trong giỏ
  private readonly items = signal<CartItem[]>([]);
  
  // Tổng số lượng - TỰ ĐỘNG cập nhật khi items thay đổi
  readonly totalItems = computed(() => 
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );
  
  // Tổng tiền - TỰ ĐỘNG cập nhật khi items thay đổi
  readonly totalPrice = computed(() =>
    this.items().reduce((sum, item) => 
      sum + item.flower.price * item.quantity, 0)
  );
  
  addToCart(flower: Flower): void {
    this.items.update(currentItems => {
      // Logic thêm vào giỏ...
      return [...currentItems, { flower, quantity: 1 }];
    });
    // totalItems và totalPrice TỰ ĐỘNG cập nhật!
  }
}
```

### 4. Routing - Điều hướng trang

```typescript
// File: src/app/app.routes.ts

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // ===== ROUTE CƠ BẢN =====
  {
    path: '',  // URL: /
    loadComponent: () => import('./features/home/home.component')
      .then(m => m.HomeComponent)
    // ↑ Lazy loading: chỉ tải khi cần, giúp app nhanh hơn
  },
  
  {
    path: 'products',  // URL: /products
    loadComponent: () => import('./features/products/flower-list/flower-list.component')
      .then(m => m.FlowerListComponent)
  },
  
  // ===== ROUTE CÓ BẢO VỆ =====
  {
    path: 'cart',  // URL: /cart
    loadComponent: () => import('./features/cart/cart.component')
      .then(m => m.CartComponent),
    canActivate: [authGuard]  // ← Phải đăng nhập mới vào được
  },
  
  // ===== ROUTE KHÔNG TỒN TẠI =====
  {
    path: '**',  // Mọi URL không khớp
    redirectTo: ''  // Chuyển về trang chủ
  }
];
```

### 5. Guard - Bảo vệ route

```typescript
// File: src/app/core/guards/auth.guard.ts

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Guard là hàm kiểm tra trước khi vào route
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Kiểm tra đã đăng nhập chưa
  if (authService.isLoggedIn()) {
    return true;  // ✅ Cho phép vào
  }

  // ❌ Chưa đăng nhập → chuyển đến trang login
  router.navigate(['/login']);
  return false;
};
```

### 6. Input/Output - Giao tiếp giữa components

```typescript
// File: src/app/shared/components/flower-card/flower-card.component.ts

import { Component, input, output } from '@angular/core';
import { Flower } from '../../../core/models/flower.model';

@Component({
  selector: 'app-flower-card',
  template: `
    <article class="card">
      <img [src]="flower().imageUrl" [alt]="flower().name" />
      <h3>{{ flower().name }}</h3>
      <p>{{ flower().price | currency }}</p>
      
      <button (click)="onAddToCart()">Add to Cart</button>
      <button (click)="onFavoriteClick($event)">❤️</button>
    </article>
  `
})
export class FlowerCardComponent {
  // ===== INPUT - Nhận dữ liệu từ component cha =====
  flower = input.required<Flower>();  // Bắt buộc phải truyền
  isFavorite = input(false);          // Có giá trị mặc định
  
  // ===== OUTPUT - Gửi sự kiện lên component cha =====
  addToCart = output<Flower>();
  toggleFavorite = output<Flower>();
  
  onAddToCart(): void {
    this.addToCart.emit(this.flower());  // Phát sự kiện
  }
  
  onFavoriteClick(event: Event): void {
    event.stopPropagation();
    this.toggleFavorite.emit(this.flower());
  }
}
```

**Cách sử dụng trong component cha:**
```html
<!-- Trong home.component.ts template -->
@for (flower of flowers(); track flower.id) {
  <app-flower-card
    [flower]="flower"
    [isFavorite]="favoriteService.isFavorite(flower.id)"
    (addToCart)="cartService.addToCart($event)"
    (toggleFavorite)="favoriteService.toggle($event)"
  />
}
```

### 7. Template Syntax - Cú pháp trong template

```html
<!-- ===== BINDING - Liên kết dữ liệu ===== -->

<!-- Property binding: [property]="value" -->
<img [src]="flower.imageUrl" [alt]="flower.name" />

<!-- Event binding: (event)="handler()" -->
<button (click)="addToCart()">Add</button>

<!-- Two-way binding: [(ngModel)]="value" -->
<input [(ngModel)]="searchTerm" />

<!-- ===== ĐIỀU KIỆN - @if ===== -->
@if (isLoggedIn()) {
  <p>Welcome, {{ user().name }}!</p>
} @else {
  <a routerLink="/login">Please login</a>
}

<!-- ===== VÒNG LẶP - @for ===== -->
@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
} @empty {
  <p>No items found</p>
}

<!-- ===== PIPE - Chuyển đổi hiển thị ===== -->
<p>{{ price | currency }}</p>        <!-- $100.00 -->
<p>{{ date | date:'dd/MM/yyyy' }}</p> <!-- 08/01/2026 -->
<p>{{ name | uppercase }}</p>         <!-- JOHN -->
```

---

## Luồng hoạt động của ứng dụng

```
┌─────────────────────────────────────────────────────────────────┐
│                        NGƯỜI DÙNG                               │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. User mở app → Angular load app.component.ts                 │
│     ↓                                                           │
│  2. app.component hiển thị:                                     │
│     - <app-header> (thanh điều hướng)                          │
│     - <router-outlet> (nội dung trang)                         │
│     - <app-footer> (chân trang)                                │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. User click vào "Products"                                   │
│     ↓                                                           │
│  4. Router kiểm tra app.routes.ts                              │
│     path: 'products' → load FlowerListComponent                │
│     ↓                                                           │
│  5. FlowerListComponent inject FlowerService                   │
│     ↓                                                           │
│  6. FlowerService trả về danh sách hoa (từ mock-data.ts)       │
│     ↓                                                           │
│  7. Component hiển thị các <app-flower-card>                   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  8. User click "Add to Cart" (chưa đăng nhập)                  │
│     ↓                                                           │
│  9. Header chỉ hiển thị nút "Login" (không có Cart icon)       │
│     ↓                                                           │
│  10. User click "Login" → Router check không có guard          │
│      → Load LoginComponent                                      │
│     ↓                                                           │
│  11. User nhập email/password → authService.login()            │
│      → isLoggedIn = true                                       │
│     ↓                                                           │
│  12. Header TỰ ĐỘNG cập nhật (signal change detection):        │
│      - Ẩn nút "Login"                                          │
│      - Hiện icons: Favorites, Cart, Orders, Account            │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  13. User click "Cart" (đã đăng nhập)                          │
│      ↓                                                          │
│  14. Router check authGuard:                                    │
│      - authService.isLoggedIn() === true ✅                    │
│      → Cho phép vào CartComponent                              │
│      ↓                                                          │
│  15. CartComponent hiển thị các items từ CartService           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Hướng dẫn chạy dự án

### Yêu cầu

- Node.js 18+
- npm hoặc yarn

### Cài đặt

```bash
# Clone dự án
git clone <repository-url>
cd project1

# Cài đặt dependencies
npm install
```

### Chạy development server

```bash
ng serve
```

Mở trình duyệt tại `http://localhost:4200/`

### Build production

```bash
ng build
```

Output sẽ được tạo trong thư mục `dist/`

### Chạy tests

```bash
ng test
```

---

## Tài liệu tham khảo

- [Angular Documentation](https://angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Angular Signals Guide](https://angular.dev/guide/signals)

---

## Cấu trúc code theo chức năng

| Thư mục | Mục đích | Ví dụ |
|---------|----------|-------|
| `core/models` | Định nghĩa kiểu dữ liệu | `Flower`, `CartItem`, `User` |
| `core/services` | Logic nghiệp vụ | `AuthService`, `CartService` |
| `core/guards` | Bảo vệ routes | `authGuard` |
| `features/*` | Các trang chức năng | Home, Products, Cart |
| `shared/components` | Components dùng chung | Header, Footer, FlowerCard |

