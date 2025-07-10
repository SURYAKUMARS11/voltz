import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">←</button>
        <h2>Withdraw</h2>
        <div></div>
      </div>

      <div class="withdraw-content">
        <div class="balance-info">
          <div class="balance-label">Available Balance</div>
          <div class="balance-value">₹15,000</div>
        </div>

        <div class="amount-section">
          <h3>Enter Amount</h3>
          <div class="amount-input">
            <span class="currency">₹</span>
            <input type="number" [(ngModel)]="amount" placeholder="0" />
          </div>
          <div class="min-amount">Minimum withdrawal: ₹100</div>
        </div>

        <div class="bank-details">
          <h4>Bank Details</h4>
          <div class="bank-item">
            <div class="bank-icon">🏦</div>
            <div class="bank-info">
              <div class="bank-name">HDFC Bank</div>
              <div class="account-number">****1234</div>
            </div>
            <div class="bank-status">✓</div>
          </div>
          <button class="add-bank-btn">+ Add New Bank Account</button>
        </div>

        <div class="withdrawal-fees">
          <div class="fee-row">
            <span>Amount</span>
            <span>₹{{amount || 0}}</span>
          </div>
          <div class="fee-row">
            <span>Processing Fee</span>
            <span>₹{{processingFee}}</span>
          </div>
          <div class="fee-row total">
            <span>You'll Receive</span>
            <span>₹{{(amount || 0) - processingFee}}</span>
          </div>
        </div>

        <button class="withdraw-btn" (click)="processWithdraw()" [disabled]="!amount || amount < 100">
          Withdraw ₹{{amount || 0}}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      background: #f5f7fa;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .back-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .back-btn:hover {
      background: #f0f0f0;
    }

    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: #333;
    }

    .withdraw-content {
      padding: 20px;
    }

    .balance-info {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 20px;
      text-align: center;
      margin-bottom: 20px;
    }

    .balance-label {
      font-size: 16px;
      opacity: 0.9;
      margin-bottom: 8px;
    }

    .balance-value {
      font-size: 32px;
      font-weight: 700;
    }

    .amount-section {
      background: white;
      border-radius: 20px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .amount-section h3 {
      margin: 0 0 16px 0;
      color: #333;
    }

    .amount-input {
      display: flex;
      align-items: center;
      gap: 8px;
      border: 2px solid #e1e5e9;
      border-radius: 16px;
      padding: 16px 20px;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .amount-input:focus-within {
      border-color: #667eea;
    }

    .currency {
      color: #667eea;
    }

    .amount-input input {
      border: none;
      outline: none;
      font-size: 24px;
      font-weight: 600;
      flex: 1;
    }

    .min-amount {
      font-size: 14px;
      color: #666;
    }

    .bank-details {
      background: white;
      border-radius: 20px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .bank-details h4 {
      margin: 0 0 16px 0;
      color: #333;
    }

    .bank-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border: 2px solid #e1e5e9;
      border-radius: 16px;
      margin-bottom: 16px;
    }

    .bank-icon {
      font-size: 24px;
    }

    .bank-info {
      flex: 1;
    }

    .bank-name {
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    .account-number {
      font-size: 14px;
      color: #666;
    }

    .bank-status {
      color: #4caf50;
      font-size: 20px;
    }

    .add-bank-btn {
      width: 100%;
      padding: 16px;
      background: none;
      border: 2px dashed #667eea;
      border-radius: 16px;
      color: #667eea;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .add-bank-btn:hover {
      background: #f8f9ff;
    }

    .withdrawal-fees {
      background: white;
      border-radius: 20px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .fee-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      color: #666;
    }

    .fee-row.total {
      border-top: 1px solid #e1e5e9;
      padding-top: 12px;
      font-weight: 600;
      color: #333;
      font-size: 16px;
    }

    .withdraw-btn {
      width: 100%;
      padding: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 16px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .withdraw-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .withdraw-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class WithdrawComponent {
  amount: number = 0;
  processingFee = 10;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/home']);
  }

  processWithdraw() {
    if (this.amount && this.amount >= 100) {
      console.log('Processing withdrawal:', this.amount);
      // Implement withdrawal logic
      this.router.navigate(['/home']);
    }
  }
}