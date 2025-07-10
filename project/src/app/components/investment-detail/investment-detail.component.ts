import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Investment } from '../../models/investment.model';

@Component({
  selector: 'app-investment-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container" [class.slide-in]="true">
      <div class="header">
        <button class="back-btn" (click)="goBack()">←</button>
        <h2>Investment Details</h2>
        <div class="vip-level">VIP {{userVipLevel}}</div>
      </div>

      <div class="investment-detail" *ngIf="investment">
        <div class="investment-card">
          <div class="investment-header">
            <div class="investment-type">{{investment.type === 'stable' ? 'Stable Investment' : 'Daily Investment'}}</div>
            <div class="vip-required" *ngIf="getRequiredVipLevel(investment) > userVipLevel">
              VIP {{getRequiredVipLevel(investment)}} Required
            </div>
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

          <div class="quantity-section" *ngIf="canInvest()">
            <h4>Select Quantity</h4>
            <div class="quantity-controls">
              <button class="quantity-btn" (click)="decreaseQuantity()">-</button>
              <input type="number" [(ngModel)]="quantity" min="1" class="quantity-input">
              <button class="quantity-btn" (click)="increaseQuantity()">+</button>
            </div>
            <div class="total-investment">
              Total Investment: ₹{{investment.investAmount * quantity}}
            </div>
          </div>

          <div class="vip-upgrade-notice" *ngIf="!canInvest()">
            <div class="notice-icon">🔒</div>
            <h4>VIP Upgrade Required</h4>
            <p>You need VIP {{getRequiredVipLevel(investment)}} to access this investment plan.</p>
            <p>Complete the VIP 1 investment to unlock higher levels.</p>
          </div>

          <button 
            class="invest-btn" 
            (click)="proceedToInvest()" 
            [disabled]="!canInvest()"
            *ngIf="canInvest()">
            Invest ₹{{investment.investAmount * quantity}}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      background: #f5f7fa;
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
    }

    .page-container.slide-in {
      transform: translateX(0);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .back-btn {
      background: none;
      border: none;
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

    .back-btn:hover {
      background: #f0f0f0;
    }

    .header h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }

    .vip-level {
      background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
      color: #333;
      padding: 6px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
    }

    .investment-detail {
      padding: 16px;
    }

    .investment-card {
      background: white;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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

    .vip-required {
      background: #ffebee;
      color: #d32f2f;
      padding: 6px 8px;
      border-radius: 12px;
      font-size: 9px;
      font-weight: 600;
    }

    .investment-details {
      margin-bottom: 20px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
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

    .quantity-section {
      margin-bottom: 20px;
    }

    .quantity-section h4 {
      margin: 0 0 12px 0;
      color: #333;
      font-size: 16px;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
      justify-content: center;
    }

    .quantity-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #667eea;
      color: white;
      border: none;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .quantity-btn:hover {
      background: #5a6fd8;
    }

    .quantity-input {
      width: 60px;
      padding: 10px;
      border: 2px solid #e1e5e9;
      border-radius: 12px;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      min-height: 44px;
    }

    .total-investment {
      font-size: 14px;
      font-weight: 600;
      color: #667eea;
      text-align: center;
    }

    .vip-upgrade-notice {
      text-align: center;
      padding: 20px;
      background: #fff3e0;
      border-radius: 16px;
      margin-bottom: 20px;
    }

    .notice-icon {
      font-size: 40px;
      margin-bottom: 12px;
    }

    .vip-upgrade-notice h4 {
      margin: 0 0 10px 0;
      color: #f57c00;
      font-size: 16px;
    }

    .vip-upgrade-notice p {
      margin: 0 0 6px 0;
      color: #666;
      font-size: 13px;
      line-height: 1.4;
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

    .invest-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .invest-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 375px) {
      .header {
        padding: 12px;
      }

      .header h2 {
        font-size: 16px;
      }

      .vip-level {
        padding: 4px 8px;
        font-size: 10px;
      }

      .investment-detail {
        padding: 12px;
      }

      .investment-card {
        padding: 16px;
      }

      .investment-type {
        font-size: 14px;
      }

      .label {
        font-size: 12px;
      }

      .value {
        font-size: 13px;
      }

      .quantity-section h4 {
        font-size: 14px;
      }

      .quantity-btn {
        width: 40px;
        height: 40px;
        font-size: 16px;
      }

      .quantity-input {
        width: 50px;
        padding: 8px;
        font-size: 13px;
      }

      .total-investment {
        font-size: 13px;
      }

      .vip-upgrade-notice {
        padding: 16px;
      }

      .notice-icon {
        font-size: 32px;
      }

      .vip-upgrade-notice h4 {
        font-size: 14px;
      }

      .vip-upgrade-notice p {
        font-size: 12px;
      }

      .invest-btn {
        padding: 12px;
        font-size: 13px;
      }
    }

    @media (max-width: 320px) {
      .investment-detail {
        padding: 10px;
      }

      .investment-card {
        padding: 12px;
      }

      .quantity-controls {
        gap: 8px;
      }

      .quantity-btn {
        width: 36px;
        height: 36px;
        font-size: 14px;
      }

      .quantity-input {
        width: 45px;
        padding: 6px;
      }
    }
  `]
})
export class InvestmentDetailComponent implements OnInit {
  investment: Investment | null = null;
  quantity = 1;
  userVipLevel = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const investmentId = this.route.snapshot.params['id'];
    this.investment = this.dataService.getInvestmentById(Number(investmentId));
    this.userVipLevel = this.dataService.getUserVipLevel();
  }

  goBack() {
    this.router.navigate(['/invest']);
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getRequiredVipLevel(investment: Investment): number {
    if (investment.type === 'stable' && investment.investAmount === 300) return 0;
    if (investment.type === 'stable' && investment.investAmount === 1300) return 2;
    if (investment.type === 'daily') return 1;
    return 0;
  }

  canInvest(): boolean {
    if (!this.investment) return false;
    return this.userVipLevel >= this.getRequiredVipLevel(this.investment);
  }

  proceedToInvest() {
    if (this.investment && this.canInvest()) {
      // Process investment
      this.dataService.processInvestment(this.investment, this.quantity);
      this.router.navigate(['/invest']);
    }
  }
}