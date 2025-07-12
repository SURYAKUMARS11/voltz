import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Bell, Mail, MessageSquare, TrendingUp } from 'lucide-angular';

@Component({
  selector: 'app-notifications-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="page-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">
          <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
        </button>
        <h2>Notifications</h2>
        <div></div>
      </div>

      <div class="content">
        <div class="section">
          <h3>
            <lucide-icon [img]="BellIcon" size="16"></lucide-icon>
            Push Notifications
          </h3>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-title">Investment Updates</div>
              <div class="setting-description">Get notified about your investment progress</div>
            </div>
            <div class="setting-toggle">
              <input type="checkbox" [(ngModel)]="investmentUpdates">
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-title">Daily Earnings</div>
              <div class="setting-description">Receive daily earning notifications</div>
            </div>
            <div class="setting-toggle">
              <input type="checkbox" [(ngModel)]="dailyEarnings">
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-title">Referral Rewards</div>
              <div class="setting-description">Get notified when you earn referral bonuses</div>
            </div>
            <div class="setting-toggle">
              <input type="checkbox" [(ngModel)]="referralRewards">
            </div>
          </div>
        </div>

        <div class="section">
          <h3>
            <lucide-icon [img]="MailIcon" size="16"></lucide-icon>
            Email Notifications
          </h3>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-title">Weekly Reports</div>
              <div class="setting-description">Receive weekly investment summaries</div>
            </div>
            <div class="setting-toggle">
              <input type="checkbox" [(ngModel)]="weeklyReports">
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-title">Security Alerts</div>
              <div class="setting-description">Important security notifications</div>
            </div>
            <div class="setting-toggle">
              <input type="checkbox" [(ngModel)]="securityAlerts">
            </div>
          </div>
        </div>

        <div class="section">
          <h3>
            <lucide-icon [img]="MessageSquareIcon" size="16"></lucide-icon>
            Marketing
          </h3>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-title">Promotional Offers</div>
              <div class="setting-description">Receive special offers and promotions</div>
            </div>
            <div class="setting-toggle">
              <input type="checkbox" [(ngModel)]="promotionalOffers">
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-title">Product Updates</div>
              <div class="setting-description">Learn about new features and updates</div>
            </div>
            <div class="setting-toggle">
              <input type="checkbox" [(ngModel)]="productUpdates">
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
export class NotificationsSettingsComponent {
  investmentUpdates = true;
  dailyEarnings = true;
  referralRewards = true;
  weeklyReports = false;
  securityAlerts = true;
  promotionalOffers = false;
  productUpdates = true;

  readonly ArrowLeftIcon = ArrowLeft;
  readonly BellIcon = Bell;
  readonly MailIcon = Mail;
  readonly MessageSquareIcon = MessageSquare;
  readonly TrendingUpIcon = TrendingUp;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/setting']);
  }
}