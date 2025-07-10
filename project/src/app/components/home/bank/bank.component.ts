import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">←</button>
        <h2>Bank Accounts</h2>
        <button class="add-btn" (click)="showAddForm = true">+</button>
      </div>

      <div class="bank-content">
        <div class="bank-list" *ngIf="!showAddForm">
          <div class="bank-item" *ngFor="let bank of bankAccounts">
            <div class="bank-info">
              <div class="bank-icon">🏦</div>
              <div class="bank-details">
                <div class="bank-name">{{bank.bankName}}</div>
                <div class="account-number">{{bank.accountNumber}}</div>
                <div class="account-holder">{{bank.accountHolder}}</div>
              </div>
            </div>
            <div class="bank-actions">
              <div class="bank-status" [class]="bank.status">{{bank.status}}</div>
              <button class="delete-btn" (click)="deleteBank(bank.id)">🗑️</button>
            </div>
          </div>
        </div>

        <div class="add-bank-form" *ngIf="showAddForm">
          <h3>Add Bank Account</h3>
          <div class="form-group">
            <label>Account Holder Name</label>
            <input type="text" [(ngModel)]="newBank.accountHolder" placeholder="Enter account holder name">
          </div>
          <div class="form-group">
            <label>Bank Name</label>
            <input type="text" [(ngModel)]="newBank.bankName" placeholder="Enter bank name">
          </div>
          <div class="form-group">
            <label>Account Number</label>
            <input type="text" [(ngModel)]="newBank.accountNumber" placeholder="Enter account number">
          </div>
          <div class="form-group">
            <label>IFSC Code</label>
            <input type="text" [(ngModel)]="newBank.ifscCode" placeholder="Enter IFSC code">
          </div>
          <div class="form-actions">
            <button class="cancel-btn" (click)="cancelAdd()">Cancel</button>
            <button class="add-bank-btn" (click)="addBank()">Add Bank</button>
          </div>
        </div>

        <div class="bank-info-section" *ngIf="!showAddForm">
          <div class="info-card">
            <div class="info-icon">ℹ️</div>
            <div class="info-content">
              <h4>Important Information</h4>
              <ul>
                <li>Bank verification may take 1-2 business days</li>
                <li>Ensure account details are accurate</li>
                <li>Only INR accounts are supported</li>
                <li>Account holder name must match your profile</li>
              </ul>
            </div>
          </div>
        </div>
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

    .back-btn,
    .add-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .back-btn:hover,
    .add-btn:hover {
      background: #f0f0f0;
    }

    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: #333;
    }

    .bank-content {
      padding: 20px;
    }

    .bank-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 20px;
    }

    .bank-item {
      background: white;
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .bank-info {
      display: flex;
      align-items: center;
      gap: 16px;
      flex: 1;
    }

    .bank-icon {
      font-size: 32px;
    }

    .bank-details {
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
      margin-bottom: 2px;
    }

    .account-holder {
      font-size: 14px;
      color: #666;
    }

    .bank-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .bank-status {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .bank-status.verified {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .bank-status.pending {
      background: #fff3e0;
      color: #f57c00;
    }

    .delete-btn {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .delete-btn:hover {
      background: #ffebee;
    }

    .add-bank-form {
      background: white;
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .add-bank-form h3 {
      margin: 0 0 20px 0;
      color: #333;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }

    .form-group input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e1e5e9;
      border-radius: 12px;
      font-size: 16px;
      transition: all 0.3s ease;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }

    .cancel-btn {
      flex: 1;
      padding: 14px;
      background: #f5f7fa;
      color: #666;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .cancel-btn:hover {
      background: #e1e5e9;
    }

    .add-bank-btn {
      flex: 1;
      padding: 14px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .add-bank-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .bank-info-section {
      background: white;
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .info-card {
      display: flex;
      gap: 16px;
    }

    .info-icon {
      font-size: 24px;
      margin-top: 4px;
    }

    .info-content h4 {
      margin: 0 0 12px 0;
      color: #333;
    }

    .info-content ul {
      margin: 0;
      padding-left: 20px;
      color: #666;
    }

    .info-content li {
      margin-bottom: 8px;
      font-size: 14px;
    }
  `]
})
export class BankComponent {
  showAddForm = false;
  bankAccounts = [
    {
      id: 1,
      bankName: 'HDFC Bank',
      accountNumber: '****1234',
      accountHolder: 'John Doe',
      ifscCode: 'HDFC0001234',
      status: 'verified'
    },
    {
      id: 2,
      bankName: 'SBI Bank',
      accountNumber: '****5678',
      accountHolder: 'John Doe',
      ifscCode: 'SBIN0005678',
      status: 'pending'
    }
  ];

  newBank = {
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    ifscCode: ''
  };

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/home']);
  }

  addBank() {
    if (this.newBank.bankName && this.newBank.accountNumber && this.newBank.accountHolder && this.newBank.ifscCode) {
      const newBankAccount = {
        id: Date.now(),
        ...this.newBank,
        status: 'pending'
      };
      this.bankAccounts.push(newBankAccount);
      this.cancelAdd();
    }
  }

  cancelAdd() {
    this.showAddForm = false;
    this.newBank = {
      bankName: '',
      accountNumber: '',
      accountHolder: '',
      ifscCode: ''
    };
  }

  deleteBank(id: number) {
    this.bankAccounts = this.bankAccounts.filter(bank => bank.id !== id);
  }
}