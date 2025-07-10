import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BottomNavComponent } from '../shared/bottom-nav/bottom-nav.component';
import { DataService } from '../../services/data.service';
import { Investment, User } from '../../models/investment.model';

@Component({
  selector: 'app-invest',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  template: `
    <div class="page-container">
      <div class="header">
        <h2>Investment Plans</h2>
        <div class="notification-icon">
          <div class="notification-badge">2</div>
          🔔
        </div>
      </div>

      <div class="balance-info">
        <div class="balance-label">Available Balance</div>
        <div class="balance-value">₹{{user.balance | number}}</div>
      </div>

      <div class="tabs">
        <div class="tab" 
             [class.active]="activeTab === 'stable'" 
             (click)="setActiveTab('stable')">
          Stable Earning
        </div>
        <div class="tab" 
             [class.active]="activeTab === 'daily'" 
             (click)="setActiveTab('daily')">
          Daily Earning
        </div>
        <div class="tab" 
             [class.active]="activeTab === 'advanced'" 
             (click)="setActiveTab('advanced')">
          Advanced
        </div>
      </div>

      <div class="investment-list" *ngIf="activeTab === 'stable'">
        <div class="investment-card" *ngFor="let investment of stableInvestments">
          <div class="investment-header">
            <div class="investment-type">Stable Investment</div>
            <div class="investment-badge">Popular</div>
          </div>
          <div class="investment-details">
            <div class="detail-row">
              <span class="label">Investment Amount</span>
              <span class="value">₹{{investment.investAmount}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Daily Income</span>
              <span class="value highlight">₹{{investment.dailyIncome}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Total Days</span>
              <span class="value">{{investment.totalDays}} days</span>
            </div>
            <div class="detail-row">
              <span class="label">Total Income</span>
              <span class="value total">₹{{investment.totalIncome}}</span>
            </div>
          </div>
          <button class="invest-btn" (click)="invest(investment)">
            Invest Now
          </button>
        </div>
      </div>

      <div class="investment-list" *ngIf="activeTab === 'daily'">
        <div class="investment-card" *ngFor="let investment of dailyInvestments">
          <div class="investment-header">
            <div class="investment-type">Daily Investment</div>
            <div class="investment-badge">Quick</div>
          </div>
          <div class="investment-details">
            <div class="detail-row">
              <span class="label">Investment Amount</span>
              <span class="value">₹{{investment.investAmount}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Daily Income</span>
              <span class="value highlight">₹{{investment.dailyIncome}}</span>
            </div>
            <div class="detail-row">
              <span class="label">Total Days</span>
              <span class="value">{{investment.totalDays}} day</span>
            </div>
            <div class="detail-row">
              <span class="label">Total Income</span>
              <span class="value total">₹{{investment.totalIncome}}</span>
            </div>
          </div>
          <button class="invest-btn" (click)="invest(investment)">
            Invest Now
          </button>
        </div>
      </div>

      <div class="coming-soon" *ngIf="activeTab === 'advanced'">
        <div class="coming-soon-icon">🚀</div>
        <h3>Advanced Plans</h3>
        <p>Advanced investment plans are coming soon. Stay tuned for more exciting opportunities!</p>
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
      padding: 16px;
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: #333;
    }

    .notification-icon {
      position: relative;
      font-size: 20px;
      cursor: pointer;
      padding: 10px;
      border-radius: 50%;
      transition: all 0.3s ease;
      min-width: 44px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .notification-icon:hover {
      background: #f0f0f0;
    }

    .notification-badge {
      position: absolute;
      top: 6px;
      right: 6px;
      background: #ff4444;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
    }

    .balance-info {
      padding: 16px;
      text-align: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .balance-label {
      font-size: 14px;
      opacity: 0.9;
      margin-bottom: 6px;
    }

    .balance-value {
      font-size: 28px;
      font-weight: 700;
    }

    .tabs {
      display: flex;
      background: white;
      margin: 0 16px;
      border-radius: 16px;
      padding: 4px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      margin-top: -16px;
      position: relative;
      z-index: 1;
    }

    .tab {
      flex: 1;
      padding: 10px 8px;
      text-align: center;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
      font-size: 12px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tab.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .tab:not(.active) {
      color: #666;
    }

    .tab:not(.active):hover {
      background: #f8f9fa;
    }

    .investment-list {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .investment-card {
      background: white;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border: 2px solid transparent;
      transition: all 0.3s ease;
    }

    .investment-card:hover {
      border-color: #667eea;
      transform: translateY(-2px);
    }

    .investment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      flex-wrap: wrap;
      gap: 8px;
    }

    .investment-type {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .investment-badge {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6px 10px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 500;
    }

    .investment-badge.vip-required {
      background: #ffebee;
      color: #d32f2f;
    }

    .investment-badge.unlocked {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .investment-details {
      margin-bottom: 20px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding: 8px 0;
      border-bottom: 1px solid #f8f9fa;
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .label {
      color: #666;
      font-size: 13px;
    }

    .value {
      font-weight: 600;
      color: #333;
      font-size: 14px;
    }

    .value.highlight {
      color: #4caf50;
    }

    .value.total {
      color: #667eea;
      font-size: 15px;
    }

    .invest-btn {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      min-height: 48px;
    }

    .invest-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .invest-btn:disabled {
      background: #e0e0e0;
      color: #999;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .coming-soon {
      text-align: center;
      padding: 40px 16px;
    }

    .coming-soon-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .coming-soon h3 {
      font-size: 20px;
      font-weight: 700;
      color: #333;
      margin: 0 0 10px 0;
    }

    .coming-soon p {
      color: #666;
      font-size: 14px;
      line-height: 1.6;
      margin: 0;
    }

    @media (max-width: 375px) {
      .header {
        padding: 12px;
      }

      .header h2 {
        font-size: 18px;
      }

      .balance-info {
        padding: 12px;
      }

      .balance-value {
        font-size: 24px;
      }

      .tabs {
        margin: 0 12px;
        margin-top: -12px;
      }

      .tab {
        padding: 8px 6px;
        font-size: 11px;
      }

      .investment-list {
        padding: 12px;
        gap: 12px;
      }

      .investment-card {
        padding: 16px;
      }

      .investment-type {
        font-size: 14px;
      }

      .investment-badge {
        padding: 4px 8px;
        font-size: 9px;
      }

      .label {
        font-size: 12px;
      }

      .value {
        font-size: 13px;
      }

      .invest-btn {
        padding: 12px;
        font-size: 13px;
      }

      .coming-soon {
        padding: 30px 12px;
      }

      .coming-soon-icon {
        font-size: 40px;
      }

      .coming-soon h3 {
        font-size: 18px;
      }

      .coming-soon p {
        font-size: 13px;
      }
    }

    @media (max-width: 320px) {
      .tabs {
        margin: 0 10px;
        margin-top: -10px;
      }

      .tab {
        padding: 6px 4px;
        font-size: 10px;
      }

      .investment-list {
        padding: 10px;
      }

      .investment-card {
        padding: 12px;
      }

      .investment-type {
        font-size: 13px;
      }

      .investment-badge {
        padding: 3px 6px;
        font-size: 8px;
      }
    }
  `]
})
export class InvestComponent implements OnInit {
  activeTab = 'stable';
  user: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    balance: 15000,
    vipLevel: 0
  };
  stableInvestments: Investment[] = [];
  dailyInvestments: Investment[] = [];

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.user = this.dataService.getUser();
    this.stableInvestments = this.dataService.getStableInvestments();
    this.dailyInvestments = this.dataService.getDailyInvestments();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getRequiredVipLevel(investment: Investment): number {
    if (investment.type === 'stable' && investment.investAmount === 300) return 0;
    if (investment.type === 'stable' && investment.investAmount === 1300) return 2;
    if (investment.type === 'daily') return 1;
    return 0;
  }

  canInvestIn(investment: Investment): boolean {
    return (this.user.vipLevel || 0) >= this.getRequiredVipLevel(investment);
  }

  getInvestmentBadgeClass(investment: Investment): string {
    if (!this.canInvestIn(investment)) return 'vip-required';
    if (investment.type === 'stable' && investment.investAmount === 300) return 'popular';
    if (investment.type === 'daily') return 'quick';
    return 'unlocked';
  }

  getInvestmentBadgeText(investment: Investment): string {
    if (!this.canInvestIn(investment)) return `VIP ${this.getRequiredVipLevel(investment)} Required`;
    if (investment.type === 'stable' && investment.investAmount === 300) return 'Popular';
    if (investment.type === 'daily') return 'Quick';
    return 'Available';
  }

  getInvestButtonText(investment: Investment): string {
    if (!this.canInvestIn(investment)) return 'VIP Upgrade Required';
    return 'Invest Now';
  }

  invest(investment: Investment) {
    if (this.canInvestIn(investment)) {
      this.router.navigate(['/investment', investment.id]);
    }
  }
}