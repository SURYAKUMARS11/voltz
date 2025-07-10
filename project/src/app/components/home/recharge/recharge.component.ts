import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recharge',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">←</button>
        <h2>Recharge</h2>
        <div></div>
      </div>

      <div class="recharge-content">
        <div class="amount-section">
          <h3>Enter Amount</h3>
          <div class="amount-input">
            <span class="currency">₹</span>
            <input type="number" [(ngModel)]="amount" placeholder="0" />
          </div>
        </div>

        <div class="quick-amounts">
          <div class="amount-btn" 
               *ngFor="let quickAmount of quickAmounts" 
               (click)="selectAmount(quickAmount)"
               [class.selected]="amount === quickAmount">
            ₹{{quickAmount}}
          </div>
        </div>

        <div class="payment-methods">
          <h4>Select Payment Method</h4>
          <div class="method-item" 
               *ngFor="let method of paymentMethods" 
               (click)="selectMethod(method)"
               [class.selected]="selectedMethod === method">
            <div class="method-icon">{{method.icon}}</div>
            <div class="method-name">{{method.name}}</div>
            <div class="method-radio">
              <input type="radio" [checked]="selectedMethod === method">
            </div>
          </div>
        </div>

        <button class="recharge-btn" (click)="processRecharge()" [disabled]="!amount || !selectedMethod">
          Recharge ₹{{amount || 0}}
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

    .recharge-content {
      padding: 20px;
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

    .quick-amounts {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 20px;
    }

    .amount-btn {
      background: white;
      border: 2px solid #e1e5e9;
      border-radius: 16px;
      padding: 16px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
      color: #333;
    }

    .amount-btn:hover {
      border-color: #667eea;
    }

    .amount-btn.selected {
      border-color: #667eea;
      background: #667eea;
      color: white;
    }

    .payment-methods {
      background: white;
      border-radius: 20px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .payment-methods h4 {
      margin: 0 0 16px 0;
      color: #333;
    }

    .method-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border: 2px solid #e1e5e9;
      border-radius: 16px;
      margin-bottom: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .method-item:last-child {
      margin-bottom: 0;
    }

    .method-item:hover {
      border-color: #667eea;
    }

    .method-item.selected {
      border-color: #667eea;
      background: #f8f9ff;
    }

    .method-icon {
      font-size: 24px;
    }

    .method-name {
      flex: 1;
      font-weight: 500;
      color: #333;
    }

    .method-radio input {
      width: 20px;
      height: 20px;
    }

    .recharge-btn {
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

    .recharge-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .recharge-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class RechargeComponent {
  amount: number = 0;
  selectedMethod: any = null;
  quickAmounts = [100, 500, 1000, 2000, 5000, 10000];
  paymentMethods = [
    { name: 'UPI', icon: '📱' },
    { name: 'Net Banking', icon: '🏦' },
    { name: 'Credit Card', icon: '💳' },
    { name: 'Debit Card', icon: '💳' }
  ];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/home']);
  }

  selectAmount(amount: number) {
    this.amount = amount;
  }

  selectMethod(method: any) {
    this.selectedMethod = method;
  }

  processRecharge() {
    if (this.amount && this.selectedMethod) {
      console.log('Processing recharge:', this.amount, this.selectedMethod);
      // Implement recharge logic
      this.router.navigate(['/home']);
    }
  }
}