import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, DollarSign, Check } from 'lucide-angular';

@Component({
  selector: 'app-currency-settings',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="page-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">
          <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
        </button>
        <h2>Currency</h2>
        <div></div>
      </div>

      <div class="content">
        <div class="section">
          <h3>
            <lucide-icon [img]="DollarSignIcon" size="16"></lucide-icon>
            Select Currency
          </h3>
          <div class="currency-list">
            <div 
              class="currency-item" 
              *ngFor="let currency of currencies"
              (click)="selectCurrency(currency)"
              [class.selected]="selectedCurrency === currency.code"
            >
              <div class="currency-info">
                <div class="currency-symbol">{{currency.symbol}}</div>
                <div class="currency-details">
                  <div class="currency-name">{{currency.name}}</div>
                  <div class="currency-code">{{currency.code}}</div>
                </div>
              </div>
              <div class="currency-check" *ngIf="selectedCurrency === currency.code">
                <lucide-icon [img]="CheckIcon" size="20"></lucide-icon>
              </div>
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

    .currency-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .currency-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-4);
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all var(--transition-fast);
      border: 2px solid transparent;
    }

    .currency-item:hover {
      background: var(--gray-50);
    }

    .currency-item.selected {
      background: var(--primary-50);
      border-color: var(--primary-200);
    }

    .currency-info {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .currency-symbol {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-lg);
      background: var(--gray-100);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--gray-700);
    }

    .currency-details {
      flex: 1;
    }

    .currency-name {
      font-weight: 500;
      color: var(--gray-800);
      margin-bottom: var(--space-1);
    }

    .currency-code {
      font-size: var(--font-size-sm);
      color: var(--gray-600);
    }

    .currency-check {
      color: var(--primary-600);
    }
  `]
})
export class CurrencySettingsComponent {
  selectedCurrency = 'INR';
  
  currencies = [
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' }
  ];

  readonly ArrowLeftIcon = ArrowLeft;
  readonly DollarSignIcon = DollarSign;
  readonly CheckIcon = Check;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/setting']);
  }

  selectCurrency(currency: any) {
    this.selectedCurrency = currency.code;
    console.log('Currency selected:', currency);
  }
}