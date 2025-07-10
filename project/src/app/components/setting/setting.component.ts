import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BottomNavComponent } from '../shared/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, FormsModule, BottomNavComponent],
  template: `
    <div class="page-container">
      <div class="header">
        <h2>Settings</h2>
        <div class="settings-icon">⚙️</div>
      </div>

      <div class="settings-section">
        <div class="section-title">Account Settings</div>
        <div class="setting-item" (click)="navigateToProfile()">
          <div class="setting-icon">👤</div>
          <div class="setting-text">Profile Settings</div>
          <div class="setting-arrow">→</div>
        </div>
        <div class="setting-item" (click)="navigateToSecurity()">
          <div class="setting-icon">🔒</div>
          <div class="setting-text">Security & Privacy</div>
          <div class="setting-arrow">→</div>
        </div>
        <div class="setting-item" (click)="navigateToNotifications()">
          <div class="setting-icon">🔔</div>
          <div class="setting-text">Notifications</div>
          <div class="setting-arrow">→</div>
        </div>
      </div>

      <div class="settings-section">
        <div class="section-title">App Settings</div>
        <div class="setting-item" (click)="toggleTheme()">
          <div class="setting-icon">🌙</div>
          <div class="setting-text">Dark Mode</div>
          <div class="setting-toggle">
            <input type="checkbox" [(ngModel)]="isDarkMode" (change)="toggleTheme()">
          </div>
        </div>
        <div class="setting-item" (click)="changeLanguage()">
          <div class="setting-icon">🌐</div>
          <div class="setting-text">Language</div>
          <div class="setting-value">English</div>
        </div>
        <div class="setting-item" (click)="changeCurrency()">
          <div class="setting-icon">💰</div>
          <div class="setting-text">Currency</div>
          <div class="setting-value">INR (₹)</div>
        </div>
      </div>

      <div class="settings-section">
        <div class="section-title">Support</div>
        <div class="setting-item" (click)="openHelp()">
          <div class="setting-icon">❓</div>
          <div class="setting-text">Help & FAQ</div>
          <div class="setting-arrow">→</div>
        </div>
        <div class="setting-item" (click)="contactSupport()">
          <div class="setting-icon">🎧</div>
          <div class="setting-text">Customer Support</div>
          <div class="setting-arrow">→</div>
        </div>
        <div class="setting-item" (click)="openAbout()">
          <div class="setting-icon">ℹ️</div>
          <div class="setting-text">About App</div>
          <div class="setting-arrow">→</div>
        </div>
      </div>

      <div class="settings-section">
        <div class="section-title">Legal</div>
        <div class="setting-item" (click)="openTerms()">
          <div class="setting-icon">📄</div>
          <div class="setting-text">Terms & Conditions</div>
          <div class="setting-arrow">→</div>
        </div>
        <div class="setting-item" (click)="openPrivacy()">
          <div class="setting-icon">🔐</div>
          <div class="setting-text">Privacy Policy</div>
          <div class="setting-arrow">→</div>
        </div>
      </div>

      <div class="logout-section">
        <button class="logout-btn" (click)="logout()">
          <div class="logout-icon">🚪</div>
          <span>Logout</span>
        </button>
      </div>

      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      background: #f5f7fa;
      padding: 0 0 80px 0;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: #333;
    }

    .settings-icon {
      font-size: 24px;
    }

    .settings-section {
      margin: 20px;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .section-title {
      padding: 16px 20px;
      background: #f8f9fa;
      font-weight: 600;
      color: #333;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .setting-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      border-bottom: 1px solid #f0f0f0;
    }

    .setting-item:last-child {
      border-bottom: none;
    }

    .setting-item:hover {
      background: #f8f9fa;
    }

    .setting-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    .setting-text {
      flex: 1;
      font-weight: 500;
      color: #333;
    }

    .setting-arrow {
      color: #666;
      font-size: 18px;
    }

    .setting-value {
      color: #666;
      font-size: 14px;
    }

    .setting-toggle {
      display: flex;
      align-items: center;
    }

    .setting-toggle input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .logout-section {
      margin: 20px;
    }

    .logout-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 16px;
      background: #ff4444;
      color: white;
      border: none;
      border-radius: 16px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .logout-btn:hover {
      background: #ff3333;
      transform: translateY(-2px);
    }

    .logout-icon {
      font-size: 20px;
    }
  `]
})
export class SettingComponent {
  isDarkMode = false;

  constructor(private router: Router) {}

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToSecurity() {
    console.log('Navigate to Security Settings');
  }

  navigateToNotifications() {
    console.log('Navigate to Notifications');
  }

  toggleTheme() {
    console.log('Toggle theme:', this.isDarkMode);
  }

  changeLanguage() {
    console.log('Change language');
  }

  changeCurrency() {
    console.log('Change currency');
  }

  openHelp() {
    console.log('Open help');
  }

  contactSupport() {
    console.log('Contact support');
  }

  openAbout() {
    console.log('Open about');
  }

  openTerms() {
    console.log('Open terms');
  }

  openPrivacy() {
    console.log('Open privacy');
  }

  logout() {
    this.router.navigate(['/login']);
  }
}