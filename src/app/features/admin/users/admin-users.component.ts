import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { User } from '../../../core/models/flower.model';

@Component({
  selector: 'app-admin-users',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="users-page">
      <header class="page-header">
        <div>
          <h1>Users Management</h1>
          <p class="subtitle">Manage all registered users</p>
        </div>
        <button type="button" class="btn-primary" (click)="openModal('add')">
          + Add User
        </button>
      </header>

      <!-- Search -->
      <div class="search-bar">
        <input 
          type="text" 
          placeholder="Search users by name or email..."
          [(ngModel)]="searchTerm"
        />
      </div>

      <!-- Users Table -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (user of filteredUsers(); track user.id) {
              <tr>
                <td>
                  <div class="user-info">
                    <div class="avatar">{{ getInitials(user.name) }}</div>
                    <span>{{ user.name }}</span>
                  </div>
                </td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone || '-' }}</td>
                <td>
                  <span class="role-badge" [class]="user.role">{{ user.role }}</span>
                </td>
                <td>
                  <div class="actions">
                    <button type="button" class="btn-icon" title="Edit" (click)="openModal('edit', user)">
                      ✏️
                    </button>
                    <button type="button" class="btn-icon delete" title="Delete" (click)="deleteUser(user.id)">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5" class="empty-message">No users found</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      @if (showModal()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal" (click)="$event.stopPropagation()">
            <h2>{{ modalMode() === 'add' ? 'Add New User' : 'Edit User' }}</h2>
            
            <form (ngSubmit)="saveUser()">
              <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" [(ngModel)]="formData.name" name="name" required />
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" [(ngModel)]="formData.email" name="email" required />
              </div>

              <div class="form-group">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" [(ngModel)]="formData.phone" name="phone" />
              </div>

              <div class="form-group">
                <label for="address">Address</label>
                <textarea id="address" [(ngModel)]="formData.address" name="address" rows="3"></textarea>
              </div>

              <div class="form-group">
                <label for="role">Role</label>
                <select id="role" [(ngModel)]="formData.role" name="role">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div class="modal-actions">
                <button type="button" class="btn-secondary" (click)="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">
                  {{ modalMode() === 'add' ? 'Add User' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .users-page {
      max-width: 1200px;
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

    .search-bar {
      margin-bottom: 1.5rem;
    }

    .search-bar input {
      width: 100%;
      max-width: 400px;
      padding: 0.75rem 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 0.95rem;
    }

    .table-container {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      background: #f8f9fa;
      font-weight: 600;
      color: #666;
      font-size: 0.875rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #2d5a27;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .role-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .role-badge.user { background: #e3f2fd; color: #1976d2; }
    .role-badge.admin { background: #f3e5f5; color: #7b1fa2; }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-icon {
      background: none;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      border-radius: 6px;
      transition: background 0.2s;
    }

    .btn-icon:hover {
      background: #f0f0f0;
    }

    .btn-icon.delete:hover {
      background: #ffebee;
    }

    .empty-message {
      text-align: center;
      color: #999;
      padding: 2rem;
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
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal h2 {
      margin: 0 0 1.5rem 0;
      font-size: 1.25rem;
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

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }
  `]
})
export class AdminUsersComponent {
  protected readonly adminService = inject(AdminService);
  
  searchTerm = '';
  showModal = signal(false);
  modalMode = signal<'add' | 'edit'>('add');
  editingUserId = signal<string | null>(null);
  
  formData: Partial<User> = {
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'user'
  };

  filteredUsers() {
    const term = this.searchTerm.toLowerCase();
    if (!term) return this.adminService.allUsers();
    return this.adminService.allUsers().filter(u =>
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term)
    );
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  openModal(mode: 'add' | 'edit', user?: User): void {
    this.modalMode.set(mode);
    if (mode === 'edit' && user) {
      this.editingUserId.set(user.id);
      this.formData = { ...user };
    } else {
      this.editingUserId.set(null);
      this.formData = { name: '', email: '', phone: '', address: '', role: 'user' };
    }
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  saveUser(): void {
    if (!this.formData.name || !this.formData.email) return;

    if (this.modalMode() === 'add') {
      this.adminService.addUser(this.formData as Omit<User, 'id'>);
    } else {
      const id = this.editingUserId();
      if (id) {
        this.adminService.updateUser(id, this.formData);
      }
    }
    this.closeModal();
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id);
    }
  }
}
