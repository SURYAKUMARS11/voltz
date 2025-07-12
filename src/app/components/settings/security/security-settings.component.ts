import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Lock, Eye, EyeOff, Shield } from 'lucide-angular';

@Component({
  selector: 'app-security-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="page-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">
          <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
        </button>
        <h2>Security & Privacy</h2>
        <div></div>
      </div>

      <div class="content">
        <div class="section">
          <h3>
            <lucide-icon [img]="LockIcon" size="16"></lucide-icon>
            Change Password
          </h3>
          <div class="form-group">
            <label>Current Password</label>
            <div class="password-input">
              <input 
                [type]="showCurrentPassword ? 'text' : 'password'" 
                [(ngModel)]="currentPassword"
                placeholder="Enter current password"
                class="input"
              >
              <button type="button" class="password-toggle" (click)="toggleCurrentPassword()">
                <lucide-icon [img]="showCurrentPassword ? EyeOffIcon : EyeIcon" size="16"></lucide-icon>
              </button>
            </div>
          </div>
          <div class="form-group">
            <label>New Password</label>
            <div class="password-input">
              <input 
                [type]="showNewPassword ? 'text' : 'password'" 
                [(ngModel)]="newPassword"
                placeholder="Enter new password"
                class="input"
              >
              <button type="button" class="password-toggle" (click)="toggleNewPassword()">
                <lucide-icon [img]="showNewPassword ? EyeOffIcon : EyeIcon" size="16"></lucide-icon>
              </button>
            </div>
          </div>
          <div class="form-group">
            <label>Confirm New Password</label>
            <div class="password-input">
              <input 
                [type]="showConfirmPassword ? 'text' : 'password'" 
                [(ngModel)]="confirmPassword"
                placeholder="Confirm new password"
                class="input"
              >
              <button type="button" class="password-toggle" (click)="toggleConfirmPassword()">
                <lucide-icon [img]="showConfirmPassword ? EyeOffIcon : EyeIcon" size="16"></lucide-icon>
              </button>
            </div>
          </div>
          <button class="update-btn" (click)="updatePassword()">Update Password</button>
        </div>

        <div class="section">
          <h3>
            <lucide-icon [img]="ShieldIcon" size="16"></lucide-icon>
            Security Settings
          </h3>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-title">Two-Factor Authentication</div>
              <div class="setting-description">Add an extra layer of security</div>
            </div>
            <div class="setting-toggle">
              <input type="checkbox" [(ngModel)]="twoFactorEnabled" (change)="toggleTwoFactor()">
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-title">Login Notifications</div>
              <div class="setting-description">Get notified of new logins</div>
            </div>
            <div class="setting-toggle">
              <input type="checkbox" [(ngModel)]="loginNotifications" (change)="toggleLoginNotifications()">
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      background: var(--gray-50);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-5) var(--space-4);
      background: white;
      box-shadow: var(--shadow-sm);
    }

    .back-btn {
      background: var(--gray-100);
      border: none;
      border-radius: var(--radius-full);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
      color: var(--gray-600);
    }

    .back-btn:hover {
      background: var(--gray-200);
      color: var(--gray-800);
    }

    .header h2 {
      margin: 0;
      font-size: var(--font-size-xl);
      font-weight: 700;
      color: var(--gray-800);
    }

    .content {
      padding: var(--space-4);
    }

    .section {
      background: white;
      border-radius: var(--radius-2xl);
      padding: var(--space-6);
      margin-bottom: var(--space-4);
      box-shadow: var(--shadow-sm);
    }

    .section h3 {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin: 0 0 var(--space-4) 0;
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--gray-800);
    }

    .form-group {
      margin-bottom: var(--space-4);
    }

    .form-group label {
      display: block;
      margin-bottom: var(--space-2);
      font-weight: 500;
      color: var(--gray-700);
      font-size: var(--font-size-sm);
    }

    .password-input {
      position: relative;
    }

    .password-toggle {
      position: absolute;
      right: var(--space-3);
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--gray-400);
      cursor: pointer;
      padding: var(--space-2);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
    }

    .password-toggle:hover {
      color: var(--gray-600);
      background: var(--gray-100);
    }

    .update-btn {
      width: 100%;
      padding: var(--space-3) var(--space-4);
      background: var(--gradient-primary);
      color: white;
      border: none;
      border-radius: var(--radius-lg);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .update-btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-4) 0;
      border-bottom: 1px solid var(--gray-100);
    }

    .setting-item:last-child {
      border-bottom: none;
    }

    .setting-info {
      flex: 1;
    }

    .setting-title {
      font-weight: 500;
      color: var(--gray-800);
      margin-bottom: var(--space-1);
    }

    .setting-description {
      font-size: var(--font-size-sm);
      color: var(--gray-600);
    }

    .setting-toggle input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  `]
})
export class SecuritySettingsComponent {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  twoFactorEnabled = false;
  loginNotifications = true;

  readonly ArrowLeftIcon = ArrowLeft;
  readonly LockIcon = Lock;
  readonly EyeIcon = Eye;
  readonly EyeOffIcon = EyeOff;
  readonly ShieldIcon = Shield;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/setting']);
  }

  toggleCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  updatePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Implement password update logic
    console.log('Password updated');
  }

  toggleTwoFactor() {
    console.log('Two-factor authentication:', this.twoFactorEnabled);
  }

  toggleLoginNotifications() {
    console.log('Login notifications:', this.loginNotifications);
  }
}